var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function RenameFields(params) {
    kangaBaseNode.call(this, params);
    this.inputFieldName = params.input_field_names;
    this.outputFieldName = params.output_field_names;
    this.inputFieldNames = this.inputFieldName.split(',').map(function(s) { return s.trim(); });
    this.outputFieldNames = this.outputFieldName.split(',').map(function(s) { return s.trim(); });
}

extend(RenameFields, kangaBaseNode);

RenameFields.prototype._execute = function () {
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            processData(this.message, this.inputFieldNames,this.outputFieldNames);
            break;
        case KANGA_EVENT.COLLECTION:
            for (var i = 0; i < this.message.length; i++) {
                processData(this.message[i], this.inputFieldNames,this.outputFieldNames);
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
    this.klogger.debug('RenameFields: ' + JSON.stringify(this.message));
    return this.event;
};

function processData(message, inputFieldNames, outputFieldNames) {
    var len = Math.min(inputFieldNames.length, outputFieldNames.length);
    for(var i=0; i< len; i++) {
        message[outputFieldNames[i]] = message[inputFieldNames[i]];
        delete message[inputFieldNames[i]];
    }	
}

module.exports = RenameFields;