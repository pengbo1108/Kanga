var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var mqtt = require('mqtt');
var client;

function MQTTWriter(params) {
    kangaBaseNode.call(this, params);
    var hostport = params.host.split(':');
    var self = this;
    this.host = hostport[0];
    this.port = hostport[1];
    this.topicname = params.topic;
    client = mqtt.connect('mqtt://' + this.host + ':' + this.port);
    client.on('connect', function () {
        self.klogger.debug('Connected to MQTT');
    });
}

extend(MQTTWriter, kangaBaseNode);

MQTTWriter.prototype._execute = function () {
    client.publish(this.topicname, JSON.stringify(this.message));
};

module.exports = MQTTWriter;
