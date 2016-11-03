var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

var id = 0;

function EventGenerator(params) {
    kangaBaseNode.call(this, params);
    this.outputName = params.output_name;
    this.numOfEvents = Number(params.num_of_events);
    this.numOfDimensions = Number(params.num_of_dimenstions);
    this.minValue = Number(params.min_value);
    this.maxValue = Number(params.max_value);
    this.sleepingTime = Number(params.sleeping_time);
}

extend(EventGenerator, kangaBaseNode);

EventGenerator.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;
    var lastTimestamp = Date.now();

    setInterval(function () {
        var event = {};
        var root = {};
        var header = {};

        header.log = "";
        header.type = KANGA_EVENT.COLLECTION;
        header.timestamp = Date.now();
        header.name = self.outputName;
        root._header_ = header;

        var message = new Array(self.numOfDimensions);
		var i = 0;
		var k = 0;
        for (i = 0; i < self.numOfDimensions; i++) {
            var dimArray = new Array(self.numOfEvents);

            for (k = 0; k < self.numOfEvents; k++) {
                //dimArray[k] = (Math.floor((Math.random() * self.maxValue) + self.minValue));
                dimArray[k] = (Math.random() * (self.maxValue - self.minValue) + self.minValue).toFixed(4);
            }

            dimArray[0] = id++;
            message[i] = dimArray;
        }

        root[header.name] = message;
        event.root = root;

        kangaEmitter(event, isClone);
        self.setReceivedCount();

        console.log(event.root._header_.timestamp, event.root._header_.timestamp - lastTimestamp);
        lastTimestamp = event.root._header_.timestamp;

//        for (i = 0; i < self.numOfDimensions; i++) {
//            console.log(message[i]);
//        }
//        console.log(new Date().getTime() - lastTimestamp);
    }, this.sleepingTime);
};

module.exports = EventGenerator;
