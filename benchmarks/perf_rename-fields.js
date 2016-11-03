var kangaBase = '../';
var Benchmark = require('benchmark');
var renameField = require(kangaBase + 'nodes/transform/rename-fields');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.input_field_names = 'email';
obj.output_field_names = 'emailName';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","email":"Mike@samsung.com"}}}';
var renameFieldObject = new renameField(obj);

var data = JSON.parse(obj.event.toString());
var renameFieldOp = function () {
    return renameFieldObject.execute(data);
};

var bench = new Benchmark('renameFieldOp', renameFieldOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
