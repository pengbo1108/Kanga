var kangaBase = '../';
var Benchmark = require('benchmark');
var merge = require(kangaBase + 'nodes/join/merge');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.output_name = 'employee';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
var mergeObject = new merge(obj);
var data = JSON.parse(obj.event.toString());

var mergeOp = function() {
    return mergeObject.execute(data);
};

var bench = new Benchmark('mergeOp', mergeOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
