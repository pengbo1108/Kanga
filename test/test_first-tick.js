var kangaBase = '../';
var assert = require('assert');
var firstTick = require(kangaBase + 'nodes/sample/first-tick');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.bucket_size = 3;
obj.bucket_unit = 'TICK';
obj.event_type = 'EVENT';
obj.klogger = klogger;
var firstTickObject = new firstTick(obj);

// Test batch tick event
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
firstTickObject.execute(JSON.parse(obj.event.toString()));
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1436163021,"name":"person"},"person":{"name":"Alice","gender":"female","email":"Alice@samsung.com"}}}';
firstTickObject.execute(JSON.parse(obj.event.toString()));
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1489163008,"name":"person"},"person":{"name":"Jack","gender":"male","email":"Jack@samsung.com"}}}';
var output_event = firstTickObject.execute(JSON.parse(obj.event.toString()));
var expect_data = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';

//Test TIME_TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"tick"},"tick":{}}}';
var output_tick = firstTickObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

//Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"eof_event"},"eof_event":{}}}';
var output_eof = firstTickObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"eof_event"},"eof_event":{}}}';

//Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"sys_log"},"sys_log":{}}}';
var output_log = firstTickObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"sys_log"},"sys_log":{}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"none_event"},"none_event":{}}}';
var output_other = firstTickObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe('firstTick', function () {
    it('data: firstTick passed', function (done) {
        assert.equal(JSON.stringify(output_event), expect_data);
        done();
    });

    it('tick: firstTick passed', function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it('eof: firstTick passed', function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it('system log: firstTick passed', function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it('other: firstTick passed', function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
