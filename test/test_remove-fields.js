var assert = require('assert');
var kangaBase = '../';
var removeFields = require(kangaBase + 'nodes/transform/remove-fields');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_names = 'email,gender';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com", "gender":"man"}}}';
var romoveFieldsObject = new removeFields(obj);

// Test DATA event
var output_data = romoveFieldsObject.execute(JSON.parse(obj.event.toString()));
var expect_data = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike"}}}';

//Test COLLECTION event
obj.event = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"name":"jack","email":"jack@samsung.com", "gender":"man"},{"name":"john","email":"john@samsung.com", "gender":"woman"}]}}';
var output_collection = romoveFieldsObject.execute(JSON.parse(obj.event.toString()));
var expect_collection = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"name":"jack"},{"name":"john"}]}}';

//Test TIME TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_tick = romoveFieldsObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

//Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_eof = romoveFieldsObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';

//Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_log = romoveFieldsObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_other = romoveFieldsObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe("removeField", function () {
    it("data: removeField passed", function (done) {
        assert.equal(JSON.stringify(output_data), expect_data);
        done();
    });

    it("collection: removeField passed", function (done) {
        assert.equal(JSON.stringify(output_collection), expect_collection);
        done();
    });

    it("tick: removeField passed", function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it("eof: removeField passed", function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it("system log: removeField passed", function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it("other: removeField passed", function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
