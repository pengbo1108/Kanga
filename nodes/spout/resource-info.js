var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var os = require('os');

function ResourceInfo(params) {
    kangaBaseNode.call(this, params);
    this.sleepingTime = Number(params.sleeping_time);
}

extend(ResourceInfo, kangaBaseNode);

ResourceInfo.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;


    setInterval(function () {
        var loads = os.loadavg();
        var freemem = os.freemem();

        self.klogger.debug('ResourceInfo: os.loadavg() ' + loads);
        self.klogger.debug('ResourceInfo: os.freemem() ' + freemem);

        var event = {};
        var root = {};
        var header = {};
        var message = {};

        header.log = "";
        header.type = 0;
        header.timestamp = Date.now();
        header.name = self.outputName;
        root._header_ = header;
        loads = loads.toString().split(',');
        message['loadavg_60s'] = loads[0];
        message['loadavg_5m'] = loads[1];
        message['loadavg_15m'] = loads[2];
        message['freemem'] = freemem;

        root[header.name] = message;
        event.root = root;

        kangaEmitter(event, isClone);
        self.setReceivedCount();

        //console.log(event);

    }, this.sleepingTime);
};

module.exports = ResourceInfo;
