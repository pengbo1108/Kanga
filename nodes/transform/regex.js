var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function Regex(params) {
    kangaBaseNode.call(this, params);
    this.inputFieldName = params.input_field_name;
    this.outputFieldNames = params.output_field_names;
    this.outputFieldTypes = params.output_field_types;
    this.regexPattern = params.regex_pattern;
    this.namesArray = this.outputFieldNames.split(',');
    this.typesArray = this.outputFieldTypes.split(',');
}

extend(Regex, kangaBaseNode);

Regex.prototype._execute = function () {
	var i;
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            processData(this.message, this.namesArray, this.typesArray, this.regexPattern, this.inputFieldName);
            break;
        case KANGA_EVENT.COLLECTION:
            for (i = 0; i < this.message.length; i++) {
                processData(this.message[i], this.namesArray, this.typesArray, this.regexPattern, this.inputFieldName);
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

function processData(message, names, types, pattern, input) {
    var regExp = new RegExp(pattern);
    var values = regExp.exec(message[input]);
	var i = 0;
    for (i = 0; i < names.length; i++) {
        switch (types[i].toLowerCase()) {
            case 'num':
                message[names[i]] = values[i+1] !== null ? Number(values [i+1]) : 0;
                break;
                case 'bool':
                    message[names[i]] = values[i+1] !== null ? Boolean(values [i+1]) : false;
                    break;
                case 'obj':
                    message[names[i]] = values[i+1] !== null ? Object(values [i+1]) : {};
                    break;
                case 'str':
                    message[names[i]] = values[i+1] !== null ? String(values [i+1]) : '';
                    break;
                default:
                    message[names[i]] = values[i+1] !== null ? values [i+1] : '';
                    break;
        }
    }
}

module.exports = Regex;