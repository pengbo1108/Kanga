var kangaBase = '../../';
var events = require('events');
var clone = require(kangaBase + 'utils/kanga-common').clone;
var kangaLogger = require(kangaBase + 'utils/kanga-logger.js');
var kangaEmitter = new events.EventEmitter();
var node = {};
var klogger = kangaLogger("KangaTopology21", 'info');

var SaveToFile = require(kangaBase + "nodes/sink/save-to-file");
var RemoveFieldsBolt = require(kangaBase + "nodes/transform/remove-fields");
var FileReaderSpout = require(kangaBase + "nodes/spout/file-reader");

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

var flowchart_from_file_558_params = {
    output_name : "persons",
    file_path : "input_single_line.json",
    sleeping_time : "0",
    klogger : klogger
};
node["flowchart_from_file_558"] = new FileReaderSpout(flowchart_from_file_558_params);

var flowchart_remove_fields_363_params = {
    input_field_names : "name,gender",
    output_name : "employee",
    klogger : klogger
};
node["flowchart_remove_fields_363"] = new RemoveFieldsBolt(flowchart_remove_fields_363_params);

var flowchart_to_file_751_params = {
    output_file_path : "transform_output.json",
    klogger : klogger
};
node["flowchart_to_file_751"] = new SaveToFile(flowchart_to_file_751_params);

var flowchart_from_file_558 = function() {
    node["flowchart_from_file_558"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "flowchart_from_file_558"), true);
};

var flowchart_remove_fields_363 = function(event) {
    event = node["flowchart_remove_fields_363"].execute(clone(event));
    kangaEmit("flowchart_remove_fields_363", event, false);
};

var flowchart_to_file_751 = function(event) {
    event = node["flowchart_to_file_751"].execute(clone(event));
    kangaEmit("flowchart_to_file_751", event, false);
};

kangaEmitter.on("start", flowchart_from_file_558);
kangaEmitter.on("flowchart_remove_fields_363", flowchart_to_file_751);
kangaEmitter.on("flowchart_from_file_558", flowchart_remove_fields_363);

kangaEmitter.emit("start");
klogger.info('Flow Started');
