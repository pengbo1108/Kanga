var kangaBase = '../..';
var events = require('events');
var clone = require(kangaBase + '/utils/kanga-common').clone;
var kangaLogger = require(kangaBase + '/utils/kanga-logger');
var kangaEmitter = new events.EventEmitter();
var node = {};

// Create the logger for the given topology
var klogger = new kangaLogger("KangaTopology24", 'debug');


// Load all the required bolts
var random_number = require(kangaBase + "/nodes/spout/random-number");
var graph_opt = require(kangaBase + "/nodes/information/graph-opt");
var to_socket_io = require(kangaBase + "/nodes/sink/to-socket-io");

// Create an object with the required set of parameters
var flowchart_random_number_559_params = {};
flowchart_random_number_559_params.klogger = klogger;
flowchart_random_number_559_params.output_name = "r1";
flowchart_random_number_559_params.time_field_name = "x";
flowchart_random_number_559_params.value_field_names = "r1,r2,r3";
flowchart_random_number_559_params.min_value = "1";
flowchart_random_number_559_params.max_value = "100"
flowchart_random_number_559_params.sleeping_time = "1000";
node["flowchart_random_number_559"] = new random_number(flowchart_random_number_559_params);

var flowchart_add_graph_opt_329_params = {};
flowchart_add_graph_opt_329_params.klogger = klogger;
flowchart_add_graph_opt_329_params.title = "Graph1";
flowchart_add_graph_opt_329_params.x_aixs_field_name = "x";
flowchart_add_graph_opt_329_params.y_aixs_field_names = "r1,r2,r3";
flowchart_add_graph_opt_329_params.major_unit = "-1";
flowchart_add_graph_opt_329_params.y_label_format = "{0}M";
flowchart_add_graph_opt_329_params.locale = "ko-kr";
node["flowchart_add_graph_opt_329"] = new graph_opt(flowchart_add_graph_opt_329_params);

var flowchart_to_socket_io_482_params = {};
flowchart_to_socket_io_482_params.klogger = klogger;
flowchart_to_socket_io_482_params.host = "10.240.245.124:3000";
flowchart_to_socket_io_482_params.topicname = "oneM2M"
node["flowchart_to_socket_io_482"] = new to_socket_io(flowchart_to_socket_io_482_params);



// Define callback functions
var flowchart_random_number_559 = function(){
	node["flowchart_random_number_559"].generateEvents(kangaEmitter.emit.bind(kangaEmitter,"flowchart_random_number_559"), true);
};
var flowchart_add_graph_opt_329 = function(event, isClone){
	event = node["flowchart_add_graph_opt_329"].execute((isClone === true) ? clone(event) : event);
	kangaEmit("flowchart_add_graph_opt_329",event, true);
};
var flowchart_to_socket_io_482 = function(event, isClone){
	event = node["flowchart_to_socket_io_482"].execute((isClone === true) ? clone(event) : event);
	kangaEmit("flowchart_to_socket_io_482",event, true);
};

// Register the call back functions with kangaEmitter
kangaEmitter.on("start",flowchart_random_number_559);

kangaEmitter.on("flowchart_add_graph_opt_329",flowchart_to_socket_io_482);
kangaEmitter.on("flowchart_random_number_559",flowchart_add_graph_opt_329);

kangaEmitter.emit("start");
klogger.info("Flow Started");

function kangaEmit(eId, event, isClone) {
    if (event !== null) {
        if (event.constructor === Array) {
            for (var i = 0; i < event.length; i++) {
                kangaEmitter.emit(eId, event[i], isClone);
            }
        } else {
            kangaEmitter.emit(eId, event, isClone);
        }
    }
}

