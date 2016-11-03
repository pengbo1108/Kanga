var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var kangaError = require('../../utils/kanga-error');

/**
 * @param
 */
function TimeTick(params) {
    kangaBaseNode.call(this, params);
    this.outputName = params.output_name;
    this.timeUnit = params.time_unit;
    this.timeSize = params.time_size;
}

extend(TimeTick, kangaBaseNode);

function getInterval(){
    var intervalValue = 0;
    switch (this.timeUnit) {
        case 'SECOND':
            intervalValue = this.timeSize * 1000;
            break;
        case 'MINUTE':
            intervalValue = this.timeSize * 60 * 1000;
            break;
        case 'HOUR':
            intervalValue = this.timeSize * 60 * 60 * 1000;
            break;
        default:
            return intervalValue;
        }
    return intervalValue;
}

TimeTick.prototype.generateEvents = function (kangaEmitter, emitId, isClone) {
    var self = this;
    var sleepTime = getInterval.call(this);
    if(sleepTime === 0){
        self.klogger.error('Inproper time unit or size value');
        throw new kangaError.InvalidUserInputException('Inproper time unit or size value');
    }
    var event = {};
    var root = {};
    var header = {};

    header.log = '';
    header.type = KANGA_EVENT.TIME_TICK;
    header.timestamp = Date.now();
    header.name = self.outputName;
    root._header_ = header;
    var message = JSON.parse('{"value":"this is a time tick event"}');
    root[header.name] = message;
    event.root = root;
    event.source_node_id = emitId;
    
    //According to the time unit and size to generate time-tick event
    setInterval(function() {
         kangaEmitter(event, isClone);
         self.setReceivedCount();
	}, sleepTime);
};

module.exports = TimeTick;