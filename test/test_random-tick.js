var kangaBase = '../';
var assert = require('assert');
var randomTick = require(kangaBase + 'nodes/sample/last-tick');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.bucket_size = 3;
obj.bucket_unit = 'TICK';
obj.event_type = 'EVENT';
obj.klogger = klogger;
var randomTickObject = new randomTick(obj);

// Test batch tick event
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
randomTickObject.execute(JSON.parse(obj.event.toString()));
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1436163021,"name":"person"},"person":{"name":"Alice","gender":"female","email":"Alice@samsung.com"}}}';
randomTickObject.execute(JSON.parse(obj.event.toString()));
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1489163008,"name":"person"},"person":{"name":"Jack","gender":"male","email":"Jack@samsung.com"}}}';
var output_event = randomTickObject.execute(JSON.parse(obj.event.toString()));

//Test TIME_TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"tick"},"tick":{}}}';
var output_tick = randomTickObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

//Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"eof_event"},"eof_event":{}}}';
var output_eof = randomTickObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"eof_event"},"eof_event":{}}}';

//Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"sys_log"},"sys_log":{}}}';
var output_log = randomTickObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"sys_log"},"sys_log":{}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"none_event"},"none_event":{}}}';
var output_other = randomTickObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe('randomTick', function () {
    it('data: randomTick passed', function (done) {
        assert.notEqual(output_event, null);
        done();
    });

    it('tick: randomTick passed', function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it('eof: randomTick passed', function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it('system log: randomTick passed', function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it('other: randomTick passed', function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
