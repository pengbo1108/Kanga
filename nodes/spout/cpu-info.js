var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var os = require('os');

function CPUInfoNew(params) {
    kangaBaseNode.call(this, params);
    this.outputName = params.output_name;
    this.timeFieldName = params.time_field_name;
    this.valueFieldName = params.value_field_name;
    this.sleepingTime = params.sleeping_time;
}

extend(CPUInfoNew, kangaBaseNode);

CPUInfoNew.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;

    setInterval(function () {
        var loads = os.loadavg();

        self.klogger.debug('CPUInfoNew: os.loadavg() ' + loads);

        var event = {};
        var root = {};
        var header = {};
        var message = {};

        header.log = "";
        header.type = 0;
        header.timestamp = Date.now();
        header.name =  self.outputName;
        root._header_ = header;
        var date = new Date();
        message[self.timeFieldName] = date.getTime();
        loads = loads.toString().split(',');
        message[self.valueFieldName] = Number(loads[0]);

//        var jsonInfo = new Object();
//        jsonInfo[header.name] = message;

        root[header.name] = message;
        event.root = root;

        kangaEmitter(event, isClone);
        self.setReceivedCount();

        console.log(event);

    }, this.sleepingTime);
};

module.exports = CPUInfoNew;
