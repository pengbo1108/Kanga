var util = require('util');

var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this);
    this.message = msg || 'Default Error Message';
};
util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'AbstractError';

var InvalidParameter = function (msg) {
    InvalidParameter.super_.call(this, msg, this.constructor);
};
util.inherits(InvalidParameter, AbstractError);
InvalidParameter.prototype.name = 'InvalidParameter';


var InvalidEvent = function (msg) {
    InvalidEvent.super_.call(this, msg, this.constructor);
};
util.inherits(InvalidEvent, AbstractError);
InvalidEvent.prototype.name = 'InvalidEvent';


var RuntimeError = function (msg) {
    RuntimeError.super_.call(this, msg, this.constructor);
};
util.inherits(RuntimeError, AbstractError);
RuntimeError.prototype.name = 'RuntimeError';

module.exports = {
    InvalidUserInputException : InvalidParameter,
    InvalidEventException : InvalidEvent,
    RuntimeException : RuntimeError
};