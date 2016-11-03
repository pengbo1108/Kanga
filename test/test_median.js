var assert = require("assert");
var kangaBase = '../';
var Median = require(kangaBase + "nodes/aggregate/median");
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('Median', 'debug');

var params = {
    output_name: "median",
    input_field_name: "age",
    output_field_name: "age_m",
    window_size: "3",
    klogger: klogger
};
var testNode = new Median(params);

var inputData1 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"age":"20"}}}';
var inputData2 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"age":"25"}}}';
var inputData3 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"age":"24"}}}';
var inputData4 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"age":"23"}}}';
var inputData5 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"age":"29"}}}';
var inputData6 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"age":"20"}}}';

var outputData1 = testNode.execute(JSON.parse(inputData1));
var outputData2 = testNode.execute(JSON.parse(inputData2));
var outputData3 = testNode.execute(JSON.parse(inputData3));
var outputData4 = testNode.execute(JSON.parse(inputData4));
var outputData5 = testNode.execute(JSON.parse(inputData5));
var outputData6 = testNode.execute(JSON.parse(inputData6));

var expectData1 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"median"},"median":{"age":"20","age_m":20}}}';
var expectData2 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"median"},"median":{"age":"25","age_m":22.5}}}';
var expectData3 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"median"},"median":{"age":"24","age_m":24}}}';
var expectData4 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"median"},"median":{"age":"23","age_m":23.5}}}';
var expectData5 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"median"},"median":{"age":"29","age_m":24}}}';
var expectData6 = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"median"},"median":{"age":"20","age_m":23.5}}}';


// Execute the test case
describe("Median", function () {
    it("TC1: Median passed", function (done) {
        assert.equal(JSON.stringify(outputData1), expectData1);
        done();
    });

    it("TC2: Median passed", function (done) {
        assert.equal(JSON.stringify(outputData2), expectData2);
        done();
    });

    it("TC3: Median passed", function (done) {
        assert.equal(JSON.stringify(outputData3), expectData3);
        done();
    });

    it("TC4: Median passed", function (done) {
        assert.equal(JSON.stringify(outputData4), expectData4);
        done();
    });

    it("TC5: Median passed", function (done) {
        assert.equal(JSON.stringify(outputData5), expectData5);
        done();
    });

    it("TC6: Median passed", function (done) {
        assert.equal(JSON.stringify(outputData6), expectData6);
        done();
    });
});