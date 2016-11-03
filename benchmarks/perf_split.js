var kangaBase = '../';
var Benchmark = require('benchmark');
var split = require(kangaBase + 'nodes/transform/split');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_name = 'email';
obj.output_field_name = 'id,domain';
obj.delimiter = '@';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var splitObject = new split(obj);

var data = JSON.parse(obj.event.toString());
var splitOp = function () {
    return splitObject.execute(data);
};

var bench = new Benchmark('splitOp', splitOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
