var kangaBase = '../../../';
var events = require('events');
var clone = require(kangaBase + 'utils/kanga-common').clone;
var kangaLogger = require(kangaBase + 'utils/kanga-logger.js');
var kangaEmitter = new events.EventEmitter();
var node = {};
var klogger = new kangaLogger("KangaTopology1", 'info');

var FileReader = require(kangaBase + "nodes/spout/file-reader");
var SaveToFile = require(kangaBase + "nodes/sink/save-to-file");
var AddField = require(kangaBase + "nodes/aggregate/add-field");

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

var flowchart_from_file_880_params = {
    output_name: "input",
    file_path: "examples/transform/input_single_line.json",
    sleeping_time: "10",
    klogger: klogger
};
node["flowchart_from_file_880"] = new FileReader(flowchart_from_file_880_params);

var flowchart_add_fields_423_params = {
    input_field_name: "department",
    value: "human resource",
    output_name: "employee1",
    klogger: klogger
};
node["flowchart_add_fields_423"] = new AddField(flowchart_add_fields_423_params);

var flowchart_add_fields_495_params = {
    input_field_name: "department",
    value: "accountant",
    output_name: "employee2",
    klogger: klogger
};
node["flowchart_add_fields_495"] = new AddField(flowchart_add_fields_495_params);

var flowchart_to_file_647_params = {
    output_file_path: "transform_output_1.json",
    klogger: klogger
};
node["flowchart_to_file_647"] = new SaveToFile(flowchart_to_file_647_params);

var flowchart_to_file_871_params = {
    output_file_path: "transform_output_2.json",
    klogger: klogger
};
node["flowchart_to_file_871"] = new SaveToFile(flowchart_to_file_871_params);

var flowchart_from_file_880 = function () {
    klogger.debug('Flow flowchart_from_file_880');
    node["flowchart_from_file_880"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "flowchart_from_file_880"), true);
};

var flowchart_add_fields_423 = function (event, isClone) {
    klogger.debug('Flow flowchart_add_fields_423');
    event = node["flowchart_add_fields_423"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("flowchart_add_fields_423", event, false);
};

var flowchart_add_fields_495 = function (event, isClone) {
    klogger.debug('Flow flowchart_add_fields_495');
    event = node["flowchart_add_fields_495"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("flowchart_add_fields_495", event, true);
};

var flowchart_to_file_647 = function (event, isClone) {
    klogger.debug('Flow flowchart_to_file_647');
    event = node["flowchart_to_file_647"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("flowchart_to_file_647", event, false);
};

var flowchart_to_file_871 = function (event, isClone) {
    klogger.debug('Flow flowchart_to_file_871');
    event = node["flowchart_to_file_871"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("flowchart_to_file_871", event, false);
};

kangaEmitter.on("start", flowchart_from_file_880);
kangaEmitter.on("flowchart_from_file_880", flowchart_add_fields_423);
kangaEmitter.on("flowchart_add_fields_423", flowchart_to_file_647);
kangaEmitter.on("flowchart_add_fields_495", flowchart_to_file_647);
kangaEmitter.on("flowchart_add_fields_495", flowchart_to_file_871);
kangaEmitter.on("flowchart_from_file_880", flowchart_add_fields_495);

klogger.info('Flow Started');
kangaEmitter.emit("start");

