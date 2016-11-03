var kangaBase = '../';
var Benchmark = require('benchmark');
var addField = require(kangaBase + 'nodes/transform/add-field');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_name = 'department';
obj.value = 'human_resource';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"person"},"person":{"name":"Mike","gender":"male","email":"Mike@samsung.com"}}}';
var addFieldObject = new addField(obj);

var data = JSON.parse(obj.event.toString());
var addFieldOp = function () {
    return addFieldObject.execute(data);
};

var bench = new Benchmark('addFieldOp', addFieldOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
