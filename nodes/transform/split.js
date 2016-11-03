var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function Split(params) {
    kangaBaseNode.call(this, params);
    this.inputFieldName = params.input_field_name;
    this.outputFieldName = params.output_field_name;
    this.delimiter = params.delimiter;
    this.outputFields = this.outputFieldName.split(',').map(function(s) { return s.trim(); });
}

extend(Split, kangaBaseNode);

Split.prototype._execute = function () {
	var values;
	var i;
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            values = this.message[this.inputFieldName].split(this.delimiter);
            processData(this.outputFields, values, this.message);
            break;
        case KANGA_EVENT.COLLECTION:
            for (i = 0; i < this.message.length; i++) {
                values = this.message[i][this.inputFieldName].split(this.delimiter);
                processData(this.outputFields, values, this.message[i]);
            }
            break;
        case KANGA_EVENT.TIME_TICK:
            return null;
        case KANGA_EVENT.EOF:
        case KANGA_EVENT.SYSTEM_LOG:
            break;
        default:
            return null;
    }
    return this.event;
};

function processData(outputFields, values, message) {
    var j = 0;
	var i = 0;
    for( i = 0;i < outputFields.length; i++)
    {
        if(j <= values.length){
            message[outputFields[j]] = values[j];
        } else {
            message[outputFields[j]] = '';
        }
        j++;
    }
}

module.exports = Split;