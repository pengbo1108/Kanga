var kangaBase = '../';
var assert = require('assert');
var merge = require(kangaBase+ 'nodes/join/merge');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.output_name = 'employee';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
var mergeObject = new merge(obj);

// Test DATA event
var output_data = mergeObject.execute(JSON.parse(obj.event.toString()));
var expect_data = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';

//Test COLLECTION event
obj.event = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"gender":"male","name":"jack","weight":70,"age":21,"email":"jack@samsung.com"},{"gender":"male","name":"john","weight":85,"age":22,"email":"john@samsung.com"}]}}';
var output_collection = mergeObject.execute(JSON.parse(obj.event.toString()));
var expect_collection = '{"root":{"_header_":{"log":"","name":"employee","type":1,"timestamp":1455163028},"employee":[{"gender":"male","name":"jack","weight":70,"age":21,"email":"jack@samsung.com"},{"gender":"male","name":"john","weight":85,"age":22,"email":"john@samsung.com"}]}}';

//Test TIME_TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_tick = mergeObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

//Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_eof = mergeObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';

//Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_log = mergeObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
var output_other = mergeObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe('merge', function () {
    it('data: merge passed', function (done) {
        assert.equal(JSON.stringify(output_data), expect_data);
        done();
    });

    it('collection: merge passed', function (done) {
        assert.equal(JSON.stringify(output_collection), expect_collection);
        done();
    });

    it('tick: merge passed', function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it('eof: merge passed', function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it('system log: merge passed', function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it('other: merge passed', function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
