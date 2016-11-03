var assert = require("assert");
var kangaBase = '../';
var EventGenerator = require(kangaBase + "nodes/spout/event-generator");

var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var klogger = new kangaLogger("test", 'debug');

var events = require('events');
var kangaEmitter = new events.EventEmitter();



var params = {
    output_name: "EGS",
    num_of_events: "10",
    num_of_dimenstions: "3",
    min_value: "0",
    max_value: "10",
    sleeping_time: "500",
    klogger: klogger
};
testNode = new EventGenerator(params);
testNode.generateEvents(
        kangaEmitter.emit.bind(kangaEmitter, "TC_001"),
        true);
        
//testNode2 = new EventGenerator(params);
//testNode2.generateEvents(
//        kangaEmitter.emit.bind(kangaEmitter, "TC_001"),
//        true);


// Execute the test case
//describe("Median", function () {
//    it("TC1: Median passed", function (done) {
//        assert.equal(JSON.stringify(outputData1), expectData1);
//        done();
//    });
//});