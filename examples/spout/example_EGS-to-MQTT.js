var kangaBase = '../..';
var events = require('events');
var clone = require(kangaBase + '/utils/kanga-common').clone;
var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var kangaEmitter = new events.EventEmitter();
var node = {};

// Create the logger for the given topology
var klogger = new kangaLogger("KangaTopology26", 'debug');


// Load all the required bolts
var event_generator = require(kangaBase + "/nodes/spout/event-generator")
var mqtt_writer = require(kangaBase + "/nodes/sink/mqtt-writer")

// Create an object with the required set of parameters
var flowchart_event_generator_1_900_params = {}
flowchart_event_generator_1_900_params.klogger = klogger
flowchart_event_generator_1_900_params.output_name = "egs"
flowchart_event_generator_1_900_params.num_of_events = "16384"
flowchart_event_generator_1_900_params.num_of_dimenstions = "3"
flowchart_event_generator_1_900_params.min_value = "-2"
flowchart_event_generator_1_900_params.max_value = "2"
flowchart_event_generator_1_900_params.sleeping_time = "1000"
node["flowchart_event_generator_1_900"] = new event_generator(flowchart_event_generator_1_900_params)

var flowchart_to_mqtt_890_params = {}
flowchart_to_mqtt_890_params.klogger = klogger
flowchart_to_mqtt_890_params.host = "10.251.20.120:1883"
flowchart_to_mqtt_890_params.topic = "egs"
node["flowchart_to_mqtt_890"] = new mqtt_writer(flowchart_to_mqtt_890_params)



// Define callback functions
var flowchart_event_generator_1_900 = function(){
	node["flowchart_event_generator_1_900"].generateEvents(kangaEmitter.emit.bind(kangaEmitter,"flowchart_event_generator_1_900"), true);
}
var flowchart_to_mqtt_890 = function(event, isClone){
	event = node["flowchart_to_mqtt_890"].execute((isClone == true) ? clone(event) : event);
	kangaEmit("flowchart_to_mqtt_890",event, true);
}

// Register the call back functions with kangaEmitter
kangaEmitter.on("start",flowchart_event_generator_1_900)

kangaEmitter.on("flowchart_event_generator_1_900",flowchart_to_mqtt_890);

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

