var assert = require("assert");
var kangaBase = '../';
var CPUInfo = require(kangaBase + "nodes/spout/cpu-info");

var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var klogger = new kangaLogger("test", 'debug');

var events = require('events');
var kangaEmitter = new events.EventEmitter();



var params = {
    output_name: "cpu",
    time_field_name: "x",
    value_field_name: "y",
    sleeping_time: 1000,
    klogger: klogger
};
testNode = new CPUInfo(params);
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