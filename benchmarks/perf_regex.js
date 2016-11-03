var kangaBase = '../';
var Benchmark = require('benchmark');
var regexField = require(kangaBase + 'nodes/transform/regex');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_name = 'email';
obj.output_field_names = 'id,domain,test';
obj.output_field_types = 'string,string,BOOL';
obj.regex_pattern = '(.*)?@(.*)';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var regexFieldObject = new regexField(obj);

var data = JSON.parse(obj.event.toString());
var regexFieldOp = function () {
    return regexFieldObject.execute(data);
};

var bench = new Benchmark('regexFieldOp', regexFieldOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
