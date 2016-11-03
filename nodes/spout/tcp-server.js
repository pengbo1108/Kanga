"use strict";
var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var net = require('net');

function TCPServer(params) {
    kangaBaseNode.call(this, params);
    this.port = params.port;
}

extend(TCPServer, kangaBaseNode);

TCPServer.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;
    var server = net.createServer();
    server.on('connection', function (socket) {
        self.klogger.debug('TCPServer: New connection with ' + JSON.stringify(socket.address()));

        socket.on('connect', function () {
            self.klogger.debug('TCPServer: socket.on connect');
        });

        socket.on('close', function () {
            self.klogger.debug('TCPServer: socket.on close');
        });

        socket.on('error', function (err) {
            self.klogger.debug('TCPServer: socket.on error ' + err + ' ' + socket);
        });

        socket.on('data', function (data) {
            data = data.toString();
            self.klogger.debug('TCPServer: socket.on data ' + data);

            try {
                var event = {};
                var root = {};
                var header = {};

                header.log = "";
                header.type = 0;
                header.timestamp = Date.now();
                header.name = self.outputName;
                root._header_ = header;
                message = JSON.parse(data);
                root[header.name] = message;
                event.root = root;

                kangaEmitter(event, isClone);
                self.setReceivedCount();
            } catch (e) {
                self.klogger.error('TCPServer: data is not parsed ' + e.message);
                self.setFailedCount();
                self.setErrorMessage(e.message);
            }

        });
    });
    server.on('error', function (err) {
        self.klogger.error('TCPServer: Server [Error]' + err.message);
    });
    server.on('close', function () {
        //self.klogger.debug('TCPServer: Server closed');
        socket.send("close");
    });

    server.listen(this.port, function () {
        self.klogger.debug('TCPServer: listening on ' + self.port);
    });
};

module.exports = TCPServer;
