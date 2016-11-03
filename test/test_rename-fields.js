var assert = require('assert');
var kangaBase = '../';
var renameField = require(kangaBase + 'nodes/transform/rename-fields');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_names = 'name,email';
obj.output_field_names = 'newname,emailName,test';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var renameFieldObject = new renameField(obj);

// Test DATA event
var output_data = renameFieldObject.execute(JSON.parse(obj.event.toString()));
var expect_data = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"newname":"Mike","emailName":"Mike@samsung.com"}}}';

//Test COLLECTION event
obj.event = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"name":"jack","email":"jack@samsung.com"},{"name":"john","email":"john@samsung.com"}]}}';
var output_collection = renameFieldObject.execute(JSON.parse(obj.event.toString()));
var expect_collection = '{"root":{"_header_":{"log":"","name":"persons","type":1,"timestamp":1455163028},"persons":[{"newname":"jack","emailName":"jack@samsung.com"},{"newname":"john","emailName":"john@samsung.com"}]}}';

//Test TIME TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_tick = renameFieldObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

//Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_eof = renameFieldObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';

//Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_log = renameFieldObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var output_other = renameFieldObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe("renameField", function () {
    it("data: renameField passed", function (done) {
        assert.equal(JSON.stringify(output_data), expect_data);
        done();
    });

    it("collection: renameField passed", function (done) {
        assert.equal(JSON.stringify(output_collection), expect_collection);
        done();
    });

    it("tick: renameField passed", function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it("eof: regex passed", function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it("system log: renameField passed", function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it("other: renameField passed", function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
