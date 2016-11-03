var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var vm = module.require('vm');

function WhereClause(params) {
    kangaBaseNode.call(this, params);
    this.condition = params.condition;
}

extend(WhereClause, kangaBaseNode);

WhereClause.prototype._execute = function () {
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            vm.runInThisContext(this.messageName + ' = ' + JSON.stringify(this.message));
            if (!vm.runInThisContext(this.condition)) {
                return null;
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

module.exports = WhereClause;