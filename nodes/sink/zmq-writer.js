var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;


function ZMQWriter(params) {
    kangaBaseNode.call(this, params);
    this.host = params.host;
    this.topicname = params.topicname;

    var zmq = require('zmq');
    this.socket = zmq.socket('pub');
    this.socket.bindSync(this.host);
}

extend(ZMQWriter, kangaBaseNode);

ZMQWriter.prototype._execute = function () {
    this.klogger.debug('ZMQWriter: Publisher to port ' + this.host + ' (' + this.topicname + ') : ' + JSON.stringify(this.message));
    this.socket.send([this.topicname, JSON.stringify(this.message)]);
};

module.exports = ZMQWriter;
