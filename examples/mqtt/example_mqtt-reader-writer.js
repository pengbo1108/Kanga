var kangaBase = '../../';

var clone = require(kangaBase + 'utils/kanga-common').clone;
var KangaLogger = require(kangaBase + 'utils/kanga-logger');

var MQTTWriter = require('../sink/mqtt-writer');
var MQTTReader = require('../spout/mqtt-reader');
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();

var node = {};

var log = new KangaLogger();
log.topologyLog('MQTTTestTopology', 'debug');
var klogger = log.getTopologyLog('MQTTTestTopology');

var writerParams = {
  host: '10.251.21.107:1883',
  topic: 'input',
  klogger: klogger
};

var readerParams = {
  output_name: 'mqtt',
  host: '10.251.21.107:1883',
  topic: 'input',
  klogger: klogger
};

node['mqttWriter'] = new MQTTWriter(writerParams);
node['mqttReader'] = new MQTTReader(readerParams);


var reader = function() {
  klogger.debug('MQTTReader');
  node['mqttReader'].generateEvents(eventEmitter.emit.bind(eventEmitter, 'mqttReader'), false);
};

var writer = function(event, createCopy) {
  klogger.debug('MQTTWriter');
  node['mqttWriter'].execute((createCopy === true) ? clone(event) : event);
  emitEvent('mqttWriter', event, false);
};

eventEmitter.on('start', writer);
eventEmitter.on('mqttWriter', reader);

klogger.info('Test started');

var message = '{"id":"Q9500","state":"on","temperature":{"value":"25", "unit":"celcius"}}';
var messageName = 'device';

var event = {};
var root = {};
var header = {};

header.log='';
header.type= 0;
header.timestamp = Date.now();
header.name = messageName;
root._header_ = header;
var input = JSON.parse(message);
root[header.name] = JSON.stringify(input);
event.root = root;

for (var i = 0; i<100; i++) {
  eventEmitter.emit('start', event);
}

function emitEvent(eventId, event, createCopy)  {
  createCopy = true;
  if(event !=null) {
    if (event.constructor == Array) {
      for(var i = 0; i < event.length; i++) {
         eventEmitter.emit(eventId, event[i], createCopy);
      }
    }else {
      eventEmitter.emit(eventId, event, createCopy);
    }
  }
}
