var kangaBase = '../';
var Benchmark = require('benchmark');
var whereClause = require(kangaBase + 'nodes/filter/where-clause');
var kangaLogger = require(kangaBase + 'utils/kanga-logger');
var klogger = kangaLogger('KangaTopology1', 'error');

// Construct test object
var obj = {};
obj.condition = 'employee.age > 30';
obj.klogger = klogger;
obj.event = '{"root":{"_header_":{"log":"","type":0,"timestamp":1455163028,"name":"employee"},"employee":{"name":"Mike","age":34,"gender":"man"}}}';
var whereClauseObject = new whereClause(obj);
var data = JSON.parse(obj.event.toString());

var whereClauseOp = function () {
    return whereClauseObject.execute(data);
};

var bench = new Benchmark('whereClauseOp', whereClauseOp,{maxTime : 5});
bench.on('cycle', function (event) {
    console.log(String(event.target));
})
.run({
    'async' : true
});
