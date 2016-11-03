var kangaBase = '../';
var assert = require('assert');
var AddGraphOpt = require(kangaBase+ 'nodes/information/graph-opt');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = new kangaLogger('KangaTopology1', 'error');

// Construct test object

var params = {
    title: "tester",
    major_unit: "10",
    x_aixs_field_name: "time",
    y_aixs_field_names: "y1, y2, y3",
    y_label_format: "{0}%",
    locale: 'ko-kr',
    klogger: klogger
};


var event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"time":"342345435","y1":"10","y2":"20","y3":"20"}}}';
var json = JSON.parse(event.toString());
json.root.person['time'] = Date.now();
var tester = new AddGraphOpt(params);

// Test DATA event
var output_data = tester.execute(json);


// Execute the test case
//describe('merge', function() {
//    it('data: merge passed', function(done) {
//        assert.equal(JSON.stringify(output_data), expect_data);
//        done();
//    });
//
//    it('collection: merge passed', function(done) {
//        assert.equal(JSON.stringify(output_collection), expect_collection);
//        done();
//    });
//
//    it('tick: merge passed', function(done) {
//        assert.equal(output_tick, expect_tick);
//        done();
//    });
//
//    it('eof: merge passed', function(done) {
//        assert.equal(JSON.stringify(output_eof), expect_eof);
//        done();
//    });
//
//    it('system log: merge passed', function(done) {
//        assert.equal(JSON.stringify(output_log), expect_log);
//        done();
//    });
//
//    it('other: merge passed', function(done) {
//        assert.equal(output_other, expect_other);
//        done();
//    });
//});
