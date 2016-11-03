var kangaBase = '../';
var Benchmark = require('benchmark');
var tableField = require(kangaBase + 'nodes/filter/table');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.field_name = 'name,age';
obj.field_type = 'string,num';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com", "gender":"man"}}}';
var tableFieldObject = new tableField(obj);

var data = JSON.parse(obj.event.toString());
var tableFieldOp = function () {
    return tableFieldObject.execute(data);
};

var bench = new Benchmark('tableFieldOp', tableFieldOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
