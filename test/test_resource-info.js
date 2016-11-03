//var assert = require("assert");
var kangaBase = '../';
var ResourceInfo = require(kangaBase + "nodes/spout/resource-info");
var kangaLogger = require(kangaBase + 'utils/kanga-logger.js');
var klogger = kangaLogger('ResourceInfo', 'error');
var events = require('events');
var kangaEmitter = new events.EventEmitter();

var params = {
    output_name: "resInfo",
    duration: "1000",
    klogger: klogger
};
var testNode = new ResourceInfo(params);
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