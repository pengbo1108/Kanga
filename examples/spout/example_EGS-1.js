var kangaBase = '../..';
var events = require('events');
var clone = require(kangaBase + '/utils/kanga-common').clone;
var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var kangaEmitter = new events.EventEmitter();
var node = {};

// Create the logger for the given topology
var klogger = new kangaLogger("KangaTopology25", 'debug');


// Load all the required bolts
var event_generator = require(kangaBase + "/nodes/spout/event-generator")
var save_to_file = require(kangaBase + "/nodes/sink/save-to-file")

// Create an object with the required set of parameters
var flowchart_event_generator_1_797_params = {}
flowchart_event_generator_1_797_params.klogger = klogger
flowchart_event_generator_1_797_params.output_name = "EGS_1"
flowchart_event_generator_1_797_params.num_of_events = "20000"
flowchart_event_generator_1_797_params.num_of_dimenstions = "3"
flowchart_event_generator_1_797_params.min_value = "1"
flowchart_event_generator_1_797_params.max_value = "100"
flowchart_event_generator_1_797_params.sleeping_time = "1000"
node["flowchart_event_generator_1_797"] = new event_generator(flowchart_event_generator_1_797_params)

var flowchart_to_file_93_params = {}
flowchart_to_file_93_params.klogger = klogger
flowchart_to_file_93_params.output_file_path = "/home/kanga/aiden.log"
node["flowchart_to_file_93"] = new save_to_file(flowchart_to_file_93_params)



// Define callback functions
var flowchart_event_generator_1_797 = function(){
	node["flowchart_event_generator_1_797"].generateEvents(kangaEmitter.emit.bind(kangaEmitter,"flowchart_event_generator_1_797"), true);
}
var flowchart_to_file_93 = function(event, isClone){
	event = node["flowchart_to_file_93"].execute((isClone == true) ? clone(event) : event);
	kangaEmit("flowchart_to_file_93",event, true);
}

// Register the call back functions with kangaEmitter
kangaEmitter.on("start",flowchart_event_generator_1_797)

kangaEmitter.on("flowchart_event_generator_1_797",flowchart_to_file_93);

kangaEmitter.emit("start");
klogger.info("Flow Started");

function kangaEmit(eId, event, isClone) {
    if (event != null) {
        if (event.constructor == Array) {
            for (var i = 0; i < event.length; i++) {
                kangaEmitter.emit(eId, event[i], isClone);
            }
        } else {
            kangaEmitter.emit(eId, event, isClone);
        }
    }
}

