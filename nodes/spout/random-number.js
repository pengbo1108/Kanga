var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;

function RandomNumber(params) {
    kangaBaseNode.call(this, params);
    this.outputName = params.output_name;
    this.timeFieldName = params.time_field_name;
    this.valueFieldNames = params.value_field_names;
    this.valueFieldNamesArray = this.valueFieldNames.split(',').map(function(s) { return s.trim(); });
    this.minValue = params.min_value;
    this.maxValue = params.max_value;
    this.sleepingTime = params.sleeping_time;
}

extend(RandomNumber, kangaBaseNode);

RandomNumber.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;

    setInterval(function () {
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
        
        
        for(var i in self.valueFieldNamesArray) {
            message[self.valueFieldNamesArray[i]] = Math.floor((Math.random() * Number(self.maxValue)) + Number(self.minValue));
        }
        root[header.name] = message;
        event.root = root;

        kangaEmitter(event, isClone);        
        self.setReceivedCount();
        
        console.log(event);

    }, this.sleepingTime);
}

module.exports = RandomNumber;
