var kangaBase = '../';
var assert = require("assert");
var RandomNumber = require(kangaBase + "nodes/spout/random-number");

var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var klogger = new kangaLogger("test", 'debug');

var events = require('events');
var kangaEmitter = new events.EventEmitter();



var params = {
    output_name: "random",
    time_field_name: "x",
    value_field_names: "y",
    min_value: "1",
    max_value: "10",
    sleeping_time: "1000",
    klogger: klogger
};
testNode = new RandomNumber(params);
testNode.generateEvents(
        kangaEmitter.emit.bind(kangaEmitter, "TC_001"),
        true);


// Execute the test case
//describe("Median", function () {
//    it("TC1: Median passed", function (done) {
//        assert.equal(JSON.stringify(outputData1), expectData1);
//        done();
//    });
//});