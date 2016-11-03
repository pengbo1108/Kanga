var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;

function ToSocketIO(params) {
    var self = this;
    self.host = params.host;
    self.topicName = params.topicname;
    var io = require('socket.io-client');
    this.socket = io.connect('http://' + this.host);
    kangaBaseNode.call(self, params);


    this.socket.on('connect', function () {
        self.klogger.debug('ToSocketIO: connected with topic ' + self.topicName);
        var data = {
            topicname: self.topicName
        };
        self.socket.emit('info', data);
    });

    this.socket.on('disconnect', function () {
        self.klogger.debug('ToSocketIO: disconnected');
    });
}

extend(ToSocketIO, kangaBaseNode);

ToSocketIO.prototype.send = function (msg) {
    this.socket.emit('send_msg', msg);
};

ToSocketIO.prototype._execute = function () {
    // For debug
    //var date = new Date();
    //this.message['kangaOutTime'] = date.toLocaleDateString("ko-kr") + ' ' + date.toLocaleTimeString("ko-kr");
    //console.log(this.socket);
    //this.klogger.debug('ToSocketIO: socket ' + this.socket);
    this.klogger.debug('ToSocketIO: host ' + this.host);
    this.klogger.debug('ToSocketIO: on ' + JSON.stringify(this.event));
    //ToSocketIO.prototype.send(this.message);
    this.socket.emit('send_msg', this.message);
    //this.klogger.debug('ToSocketIO: done');
    return null;
};

module.exports = ToSocketIO;
