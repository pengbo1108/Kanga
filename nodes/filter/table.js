var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function Table(params) {
    kangaBaseNode.call(this, params);
    this.fieldNames = params.field_name;
    this.fieldTypes = params.field_type;
    this.fieldNamesArray = this.fieldNames.split(',').map(function(s) { return s.trim(); });
    this.fieldTypesArray = this.fieldTypes.split(',').map(function(s) { return s.trim(); });
}

extend(Table, kangaBaseNode);

function getDefaultValueByType(type) {
    var output = null;
    switch (type.toLowerCase()) {
    case "num":
        output = 0;
        break;
    case "bool":
        output = false;
        break;
    case "obj":
        output = {};
        break;
    default:
        output = '';
    }
    return output;
}

Table.prototype._execute = function () {
    var keys = Object.keys(this.message);
    var i;
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            for (i = 0; i < keys.length; i++) {
            	if (this.fieldNamesArray.indexOf(keys[i]) === -1) {
            		delete this.message[keys[i]];
            	}
            }
            for (i = 0; i < this.fieldNamesArray.length; i++ ) {
                if (!(this.message.hasOwnProperty(this.fieldNamesArray[i]))) {
                    this.message[this.fieldNamesArray[i]] = getDefaultValueByType(this.fieldTypesArray[i]);
                }
            }
            break;
        case KANGA_EVENT.COLLECTION:
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

module.exports = Table;