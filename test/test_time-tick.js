var kangaBase = '../';
var assert = require('assert');
var events = require('events');
var timeTick = require(kangaBase + 'nodes/spout/time-tick');
var kangaEmitter = new events.EventEmitter();
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');
var KANGA_EVENT = require(kangaBase + 'constants/kanga-event-type');

// Construct test object
var obj = {};
obj.time_unit = 'SECOND';
obj.output_name = 'tick';
obj.time_size = 1;
obj.klogger = klogger;
var mergeObject = new timeTick(obj);

describe('timeTick', function() {
    it('not null: time-tick passed', function(done) {
        kangaEmitter.on('callBack', function(event, isClone){
            assert.notEqual(event, null);
            assert.equal(event.root._header_.type, KANGA_EVENT.TIME_TICK);
            done();
        });
    });
});

mergeObject.generateEvents(kangaEmitter.emit.bind(kangaEmitter, 'callBack'), true);
