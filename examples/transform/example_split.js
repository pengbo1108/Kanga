var kangaBase = '../../';
var events = require('events');
var clone = require(kangaBase + 'utils/kanga-common').clone;
var kangaLogger = require(kangaBase + 'utils/kanga-logger.js');
var kangaEmitter = new events.EventEmitter();
var node = {};
var klogger = new kangaLogger("KangaTopology21", 'info');

var SplitBolt = require(kangaBase + "nodes/transform/split");
var FileReaderSpout = require(kangaBase + "nodes/spout/file-reader");
var SaveToFile = require(kangaBase + "nodes/sink/save-to-file");


function kangaEmit(eId, event, isClone) {
    if (event !== null) {
        if (event.constructor === Array) {
        	var i;
            for (i = 0; i < event.length; i++) {
                kangaEmitter.emit(eId, event[i], isClone);
            }
        } else {
            kangaEmitter.emit(eId, event, isClone);
        }
    }
}

var flowchart_from_file_278_params = {
    output_name : "empolyee",
    file_path : "input_single_line.json",
    sleeping_time : "1000",
    klogger : klogger
};
node["flowchart_from_file_278"] = new FileReaderSpout(flowchart_from_file_278_params);

var flowchart_split_802_params = {
    input_field_name: "email",
    output_field_name: "id,domain",
    delimiter: '@',
    output_name: "employee",
    klogger: klogger
};
node["flowchart_split_802"] = new SplitBolt(flowchart_split_802_params);

var flowchart_to_file_231_params = {
    output_file_path : "transform_output.json",
    klogger : klogger
};

node["flowchart_to_file_231"] = new SaveToFile(flowchart_to_file_231_params);

var flowchart_from_file_278 = function() {
    node["flowchart_from_file_278"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "flowchart_from_file_278"), true);
};

var flowchart_split_802 = function(event) {
    event = node["flowchart_split_802"].execute(clone(event));
    kangaEmit("flowchart_split_802", event, false);
};

var flowchart_to_file_231 = function(event) {
    event = node["flowchart_to_file_231"].execute(clone(event));
    kangaEmit("flowchart_to_file_231", event, false);
};

kangaEmitter.on("start", flowchart_from_file_278);
kangaEmitter.on("flowchart_from_file_278", flowchart_split_802);
kangaEmitter.on("flowchart_split_802", flowchart_to_file_231);

kangaEmitter.emit("start");
klogger.info('Flow Started');
