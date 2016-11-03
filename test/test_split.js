var assert = require('assert');
var kangaBase = '../';
var split = require(kangaBase + 'nodes/transform/split');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_name = 'email';
obj.output_field_name = 'id,domain';
obj.delimiter = '@';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var splitObject = new split(obj);

// Test DATA event
var output_data = splitObject.execute(JSON.parse(obj.event.toString()));
var expect_data = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","id":"Mike","domain":"samsung.com"}}}';

//Test COLLECTION event
obj.event = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"name":"jack","email":"jack@samsung.com"},{"name":"john","email":"john@samsung.com"}]}}';
var output_collection = splitObject.execute(JSON.parse(obj.event.toString()));
var expect_collection = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"name":"jack","email":"jack@samsung.com","id":"jack","domain":"samsung.com"},{"name":"john","email":"john@samsung.com","id":"john","domain":"samsung.com"}]}}';

// Test TIME TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_tick = splitObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

// Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_eof = splitObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';

// Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_log = splitObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_other = splitObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe("split", function () {
    it("data: split passed", function (done) {
        assert.equal(JSON.stringify(output_data), expect_data);
        done();
    });

    it("collection: split passed", function (done) {
        assert.equal(JSON.stringify(output_collection), expect_collection);
        done();
    });

    it("tick: split passed", function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it("eof: split passed", function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it("system log: split passed", function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it("other: split passed", function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
