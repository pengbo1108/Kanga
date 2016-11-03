var kangaBase = '../../../';
var events = require('events');
var clone = require(kangaBase + 'utils/kanga-common').clone;
var kangaLogger = require(kangaBase + 'utils/kanga-logger.js');
var kangaEmitter = new events.EventEmitter();
var node = {};
var klogger = new kangaLogger("KangaTopology21", 'info');

var ZmqReader = require(kangaBase + "nodes/spout/zmq-reader");
var SaveToFile = require(kangaBase + "nodes/sink/save-to-file");


function kangaEmit(eId, event, isClone) {
    isClone = true;
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

var ZmqReader_1_params = {
    output_name: "z1",
    host: "10.251.20.120:6001",
    topic: "mach1",
    klogger: klogger
};
node["ZmqReader_1"] = new ZmqReader(ZmqReader_1_params);

var ZmqReader_2_params = {
    output_name: "z2",
    host: "10.251.20.120:6002",
    topic: "mach2",
    klogger: klogger
};
node["ZmqReader_2"] = new ZmqReader(ZmqReader_2_params);

var ZmqReader_3_params = {
    output_name: "z3",
    host: "10.251.20.120:6003",
    topic: "mach3",
    klogger: klogger
};
node["ZmqReader_3"] = new ZmqReader(ZmqReader_3_params);

var ZmqReader_4_params = {
    output_name: "z4",
    host: "10.251.20.120:6004",
    topic: "mach4",
    klogger: klogger
};
node["ZmqReader_4"] = new ZmqReader(ZmqReader_4_params);

var SaveToFile_1_params = {
    output_file_path: "output_1.json",
    klogger: klogger
};
node["SaveToFile_1"] = new SaveToFile(SaveToFile_1_params);

var SaveToFile_2_params = {
    output_file_path: "output_2.json",
    klogger: klogger
};
node["SaveToFile_2"] = new SaveToFile(SaveToFile_2_params);

var SaveToFile_3_params = {
    output_file_path: "output_3.json",
    klogger: klogger
};
node["SaveToFile_3"] = new SaveToFile(SaveToFile_3_params);

var SaveToFile_4_params = {
    output_file_path: "output_4.json",
    klogger: klogger
};
node["SaveToFile_4"] = new SaveToFile(SaveToFile_4_params);

var ZmqReader_1 = function () {
    klogger.debug('Flow ZmqReader_1');
    node["ZmqReader_1"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "ZmqReader_1"), false);
};
var ZmqReader_2 = function () {
    klogger.debug('Flow ZmqReader_2');
    node["ZmqReader_2"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "ZmqReader_2"), false);
};
var ZmqReader_3 = function () {
    klogger.debug('Flow ZmqReader_3');
    node["ZmqReader_3"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "ZmqReader_3"), false);
};
var ZmqReader_4 = function () {
    klogger.debug('Flow ZmqReader_4');
    node["ZmqReader_4"].generateEvents(kangaEmitter.emit.bind(kangaEmitter, "ZmqReader_4"), false);
};

var SaveToFile_1 = function (event, isClone) {
    klogger.debug('Flow SaveToFile_1');
    event = node["SaveToFile_1"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("SaveToFile_1", event, false);
};

var SaveToFile_2 = function (event, isClone) {
    klogger.debug('Flow SaveToFile_2');
    event = node["SaveToFile_2"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("SaveToFile_2", event, false);
};

var SaveToFile_3 = function (event, isClone) {
    klogger.debug('Flow SaveToFile_3');
    event = node["SaveToFile_3"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("SaveToFile_3", event, false);
};

var SaveToFile_4 = function (event, isClone) {
    klogger.debug('Flow SaveToFile_4');
    event = node["SaveToFile_4"].execute((isClone === true) ? clone(event) : event);
    kangaEmit("SaveToFile_4", event, false);
};

kangaEmitter.on("start", ZmqReader_1);
kangaEmitter.on("start", ZmqReader_2);
kangaEmitter.on("start", ZmqReader_3);
kangaEmitter.on("start", ZmqReader_4);

kangaEmitter.on("ZmqReader_1", SaveToFile_1);
kangaEmitter.on("ZmqReader_2", SaveToFile_2);
kangaEmitter.on("ZmqReader_3", SaveToFile_3);
kangaEmitter.on("ZmqReader_4", SaveToFile_4);

klogger.info('Flow Started');
kangaEmitter.emit("start");
