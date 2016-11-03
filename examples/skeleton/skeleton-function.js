var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');

// DO NOT declare user's global variable
// It will be shared among all instances

/**
 * Constructor called during creating the instance
 * @param {type} params
 * @returns {nm$_skeleton-function.SkeletonFunction}
 */
function SkeletonFunction(params) {
    kangaBaseNode.call(this, params);
    // Use 'this' keyward to share with prototype methods such as _execute()
    // var foo='a'
    // It is only local variable under SkeletonFunction() 
    // this.foo='a'
    // User can use this.foo in prototype methods 
}

extend(SkeletonFunction, kangaBaseNode);

/**
 * Callback whenever an event is reached
 * @returns {nm$_skeleton-function.SkeletonFunction.event}
 */
SkeletonFunction.prototype._execute = function () {
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is DATA');
            // User's code is here
            break;
        case KANGA_EVENT.COLLECTION:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is COLLECTION');
            // User's code is here
            break;
        case KANGA_EVENT.TIME_TICK:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is TIME_TICK');
            // User's code is here
            break;
        case KANGA_EVENT.EOF:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is EOF');
            // User's code is here
            break;
        case KANGA_EVENT.SYSTEM_LOG:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is SYSTEM_LOG');
            // User's code is here
            break;
        default:
            this.klogger.debug('Skeleton Function _execute() :Kanga Event Type is UNKNOWN');            
            //return null; if user do not want to emit this event
            return this.event;
    }
    
    //return null; if user do not want to emit this event
    
    return this.event;
};

module.exports = SkeletonFunction;