var fs = require("fs");
var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;

function SaveToFile(params) {
    kangaBaseNode.call(this, params);
    this.outputFile = params.output_file_path;
    this.stream = fs.createWriteStream(this.outputFile);
    this.klogger.debug('SaveToFile: ' + this.outputFile);
}

extend(SaveToFile, kangaBaseNode);

SaveToFile.prototype._execute = function () {
    this.stream.write(JSON.stringify(this.message) + '\n');
    //this.klogger.debug('SaveToFile: ' + JSON.stringify(this.message));
    return null;
};

module.exports = SaveToFile;