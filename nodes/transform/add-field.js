var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var kangaError = require('../../utils/kanga-error');
var joi = require("joi");

function validate() {
    var self = this;
    var schema = joi.object().keys({
        input_field_name: joi.string().min(1).max(255),
        input_value: joi.string().min(1).max(255)
    });
    var validateField = {
        input_field_name: this.inputFieldName,
        input_value: this.inputValue
    };
    joi.validate(validateField, schema, function (err, value) {
        if (err) {
            self.klogger.error(err);
            throw new kangaError.InvalidUserInputException(err);
        }
    });
}

function AddField(params) {
    kangaBaseNode.call(this, params);
    this.inputFieldName = params.input_field_name;
    this.inputValue = params.value;
    validate.call(this);
}

extend(AddField, kangaBaseNode);

AddField.prototype._execute = function () {
	var i;
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            this.message[this.inputFieldName] = this.inputValue;
            break;
        case KANGA_EVENT.COLLECTION:
            for (i= 0; i < this.message.length; i++) {
                this.message[i][this.inputFieldName] = this.inputValue;
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

module.exports = AddField;