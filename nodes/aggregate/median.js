var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function Median(params) {
    kangaBaseNode.call(this, params);
    this.inputFieldName = params.input_field_name;
    this.outputFieldName = params.output_field_name;
    this.windowSize = params.window_size;
    this.values = [];
}

extend(Median, kangaBaseNode);

Median.prototype._execute = function () {
    var value;
    var sortedValues;
    var half;
    var res;
    switch (this.eventType) {
        case KANGA_EVENT.RAW:
            break;
        case KANGA_EVENT.DATA:
            this.klogger.debug('Median: ' + JSON.stringify(this.message));
            value = this.message[this.inputFieldName];
            this.values.push(Number(value));

            //console.log(this.values);
            sortedValues = this.values.slice().sort();
            //console.log('sorted ' + this.values);

            // Median
            half = Math.floor(sortedValues.length / 2);
            if (sortedValues.length % 2) {
                res = sortedValues[half];
            } else {
                res = (sortedValues[half - 1] + sortedValues[half]) / 2.0;
            }

            if (this.values.length === this.windowSize) {
                this.values.shift();
            }
            this.message[this.outputFieldName] = res;
            this.klogger.debug('Median: ' + JSON.stringify(this.message));
            break;
        case KANGA_EVENT.COLLECTION:
            break;
        case KANGA_EVENT.TIME_TICK:
            break;
        case KANGA_EVENT.EOF:
            break;
        case KANGA_EVENT.SYSTEM_LOG:
            break;
        default:
            return this.event;
    }
    return this.event;
};

module.exports = Median;