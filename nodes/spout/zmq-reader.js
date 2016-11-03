var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var zmq = require('zmq');
var socket = zmq.socket('sub');

function ZMQReader(params) {
    kangaBaseNode.call(this, params);
    this.host = params.host;
    this.topicname = params.topicname;
}

extend(ZMQReader, kangaBaseNode);

ZMQReader.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;

    socket.connect('tcp://' + self.host);
    socket.subscribe(self.topicname + '');
    self.klogger.debug('ZMQReader: Subscriber connected to port ' + self.host + ' (' + self.topicname + ')');

    socket.on('message', function (topic, message) {
        if (self.topicname === topic) {
            //self.klogger.debug('ZMQReader: received a message related to:', topic.toString(), 'containing message:', message.toString());
            var event = {};
            var root = {};
            var header = {};

            header.log = "";
            header.type = 0;
            header.timestamp = Date.now();
            header.name = self.outputName;
            root._header_ = header;
            //message = JSON.parse(message);
            root[header.name] = message.toString();
            event.root = root;
//            self.klogger.debug('ZMQReader: ' + JSON.stringify(event));
            kangaEmitter(event, isClone);
        } else {
//            self.klogger.error('ZMQReader: ' + self.topicname.toString());
//            self.klogger.error('ZMQReader: ' + topic.toString());
        }
    });

    socket.on('error', function (err) {
        self.klogger.error('ZMQReader: [Error]' + err.message);
    });
    socket.on('close', function () {
        self.klogger.debug('ZMQReader: Zmq closed');
    });

};

module.exports = ZMQReader;
