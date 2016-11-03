var kangaBase = '../';
var Benchmark = require('benchmark');
var removeFields = require(kangaBase + 'nodes/transform/remove-fields');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_names = 'email,gender';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com", "gender":"man"}}}';
var romoveFieldsObject = new removeFields(obj);

var data = JSON.parse(obj.event.toString());
var romoveFieldsOp = function () {
    return romoveFieldsObject.execute(data);
};

var bench = new Benchmark('romoveFieldsOp', romoveFieldsOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
