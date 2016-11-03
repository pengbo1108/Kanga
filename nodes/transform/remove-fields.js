var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function RemoveFields(params) {
    kangaBaseNode.call(this, params);
    this.inputFieldName = params.input_field_names;
    this.inputFieldNames = this.inputFieldName.split(',').map(function (s) {
        return s.trim();
    });
}

extend(RemoveFields, kangaBaseNode);

RemoveFields.prototype._execute = function () {
    var i;
    var j;
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            for (i = 0; i < this.inputFieldNames.length; i++) {
                delete this.message[this.inputFieldNames[i]];
            }
            break;
        case KANGA_EVENT.COLLECTION:
            for (i = 0; i < this.message.length; i++) {
                for (j = 0; j < this.inputFieldNames.length; j++) {
                    delete this.message[i][this.inputFieldNames[j]];
                }
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

module.exports = RemoveFields;