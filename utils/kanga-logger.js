var bunyan = require('bunyan');
var config = require('../config/config-log');

/**
 * The logger for a topology
 */
function Log(topologyName, logLevel) {
    var bunyanLog = bunyan.createLogger({
        name: topologyName,
        streams: [{
                level: logLevel,
                stream: process.stdout
            },
            {
                level: config.file.level,
                path: config.file.file_path
            }]
    });
    return bunyanLog;
}

module.exports = Log;