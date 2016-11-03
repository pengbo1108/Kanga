var kangaBase = '../';
var assert = require('assert');
var whereClause = require(kangaBase + 'nodes/filter/where-clause');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.output_name = 'employee';
obj.condition = 'employee.age > 30';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","age":34,"gender":"man"}}}';
var whereClauseObject = new whereClause(obj);

// Test basic feature event
var output_normal_data = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_normal_data = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","age":34,"gender":"man"}}}';

//Test false condition event
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","age":24, "gender":"man"}}}';
var output_false_data = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_false_data = null;

//Test COLLECTION event
obj.event = '{"root":{"_header_":{"log":"","type":1,"timestamp":1455163028,"name":"employees"},"employees":[{"gender":"male","name":"jack","age":21},{"gender":"male","name":"john","age":22}]}}';
var output_collection = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_collection = null;

//Test missing field event
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike", "gender":"man"}}}';
var output_missing_field_data = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_missing_field_data = null;

//Test TIME_TICK event
obj.event = '{"root":{"_header_":{"log":"","type":2,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_tick = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_tick = null;

//Test EOF event
obj.event = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_eof = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_eof = '{"root":{"_header_":{"log":"","type":3,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';

//Test SYSTEM_LOG event
obj.event = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';
var output_log = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_log = '{"root":{"_header_":{"log":"","type":4,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com","gender":"man"}}}';

//Test other type event
obj.event = '{"root":{"_header_":{"log":"","type":5,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
var output_other = whereClauseObject.execute(JSON.parse(obj.event.toString()));
var expect_other = null;

// Execute the test case
describe('where-clause', function () {
    it('base-feature: where-clause passed', function (done) {
        assert.equal(JSON.stringify(output_normal_data), expect_normal_data);
        done();
    });

    it('false condition: where-clause passed', function (done) {
        assert.equal(output_false_data, expect_false_data);
        done();
    });

    it('collection: where-clause passed', function (done) {
        assert.equal(output_collection, expect_collection);
        done();
    });

    it('missing field: where-clause passed', function (done) {
        assert.equal(output_missing_field_data, expect_missing_field_data);
        done();
    });

    it('tick: where-clause passed', function (done) {
        assert.equal(output_tick, expect_tick);
        done();
    });

    it('eof: where-clause passed', function (done) {
        assert.equal(JSON.stringify(output_eof), expect_eof);
        done();
    });

    it('system: where-clause passed', function (done) {
        assert.equal(JSON.stringify(output_log), expect_log);
        done();
    });

    it('other: where-clause passed', function (done) {
        assert.equal(output_other, expect_other);
        done();
    });
});
