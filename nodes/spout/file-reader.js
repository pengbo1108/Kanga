var readline = require('readline');
var fs = require('fs');
var lineReader = require('line-reader');
var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;

function FileReader(params) {
    kangaBaseNode.call(this, params);
    this.outputName = params.output_name;
    this.filePath = params.file_path;
    this.sleepingTime = params.sleeping_time;
}

extend(FileReader, kangaBaseNode);

FileReader.prototype.generateEvents = function (kangaEmitter,  isClone) {
    var self = this;

    if (this.sleepingTime > 0) {
        self.klogger.debug('sleeping with ' + self.sleepingTime);
        lineReader.eachLine(this.filePath, this.sleepingTime, function (line) {
            FileReader.prototype.readLine(self, line, kangaEmitter,  isClone);
        });
    } else {
        self.klogger.debug('without sleeping');
        var rl = readline.createInterface({
            input: fs.createReadStream(this.filePath)
        });
        rl.on('line', function (line) {
            FileReader.prototype.readLine(self, line, kangaEmitter,  isClone);
        });
    }
};

FileReader.prototype.readLine = function (self, line, kangaEmitter,  isClone) {
    self.klogger.debug(line);

    try {
        var event = {};
        var root = {};
        var header = {};

        header.log = "";
        header.type = 0;
        header.timestamp = Date.now();
        header.name = self.outputName;
        root._header_ = header;

        message = JSON.parse(line.toString());
        root[header.name] = message;
        event.root = root;

        self.klogger.debug(event);

        kangaEmitter(event, isClone);
        self.setEmittedCount();
    } catch (e) {
        self.klogger.error('FileReader emit failed ' + e.message);
        self.setFailedCount();
        self.setErrorMessage(e.message);
    }
};

module.exports = FileReader;