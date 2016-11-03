var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

function Merge(params) {
    kangaBaseNode.call(this, params);
}

extend(Merge, kangaBaseNode);

Merge.prototype._execute = function () {
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
        case KANGA_EVENT.COLLECTION:
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

module.exports = Merge;