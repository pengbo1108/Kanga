var kangaBase = '../';
var Benchmark = require('benchmark');
var lastTick = require(kangaBase + 'nodes/sample/first-tick');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.bucket_size = 3;
obj.bucket_unit = 'TICK';
obj.event_type = 'EVENT';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
var lastTickObject = new lastTick(obj);
var data = JSON.parse(obj.event.toString());

var lastTickOp = function () {
    return lastTickObject.execute(data);
};

var bench = new Benchmark('lastTickOp', lastTickOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
