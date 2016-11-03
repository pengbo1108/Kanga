var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

// DO NOT declare user's global variable
// It will be shared among all instances

/**
 * Constructor called during creating the instance
 * @param {type} params
 * @returns {nm$_skeleton-spout.SkeletonSpout}
 */
function SkeletonSpout(params) {
    kangaBaseNode.call(this, params);
    // Use 'this' keyward to share with prototype methods such as _execute()
    // var foo='a'
    // It is only local variable under SkeletonFunction()
    // this.foo='a'
    // User can use this.foo in prototype methods
}

extend(SkeletonSpout, kangaBaseNode);

SkeletonSpout.prototype.generateEvents = function (kangaEmitter, isClone) {
    var self = this;
    var data = 'input data from external source';

    self.klogger.debug('Skeleton Spout generateEvents() : raw data ' + data);

    // Adjust external data into kanga event structure which is json format
    var event = {};
    var root = {};
    var header = {};

    header.log = "";
    header.type = KANGA_EVENT.DATA;
    header.timestamp = Date.now();
    header.name = self.outputName;
    root._header_ = header;
    var message = JSON.parse(data);
    root[header.name] = message;
    event.root = root;

    kangaEmitter(event, isClone);
    self.setReceivedCount();
};

module.exports = SkeletonSpout;
