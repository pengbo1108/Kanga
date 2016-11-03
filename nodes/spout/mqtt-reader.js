var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var mqtt = require('mqtt');
var KANGA_EVENT = require('../../constants/kanga-event-type');

function MQTTReader(params) {
    kangaBaseNode.call(this, params);
    var self = this;
    this.outputname = params.output_name;
    this.host = params.host;
    this.topicname = params.topic;
    this.outputDataType = params.output_data_type;

    this.client = mqtt.connect('mqtt://' + this.host);

    this.client.on('connect', function () {
        self.client.subscribe(self.topicname);
        self.klogger.debug('MQTTReader: connected');
    });

    this.client.on('error', function (err) {
        self.klogger.error('MQTTReader: [Error] ' + err.message);
    });

    this.client.on('close', function () {
        self.klogger.debug('MQTTReader: connection closed');
    });
}

extend(MQTTReader, kangaBaseNode);


MQTTReader.prototype.generateEvents = function (eventEmitter, createCopy) {
    var self = this;
    this.client.on('message', function (topic, message) {
        if (self.topicname === topic) {
            var event = {};
            var root = {};
            var header = {};

            header.log = "";
            header.type = Number(KANGA_EVENT[this.outputDataType]);
            header.timestamp = Date.now();
            header.name = self.outputname;
            root._header_ = header;
            root[header.name] = (header.type === KANGA_EVENT.RAW) ? message.toString() : JSON.parse(message.toString());

            //console.log(root[header.name]);
            event.root = root;
            eventEmitter(event, createCopy);
        }
    });
};

module.exports = MQTTReader;