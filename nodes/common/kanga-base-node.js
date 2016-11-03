/* Copyright 2015-2016 Samsung Electronics Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The base node of all Kanga nodes
 * @constructor
 */
var KangaBaseNode = function (params) {
    this.event = null;
    this.root = null;
    this.header = null;
    this.messageName = null;
    this.message = null;
    this.eventType = 0;
    this.emittedCount = 0;
    this.receivedCount = 0;
    this.failedCount = 0;
    this.errorMessage = null;
    this.klogger = params.klogger;
    this.outputName = params.output_name;
};

/**
 * Increases the number of received event count
 */
KangaBaseNode.prototype.setReceivedCount = function () {
    this.receivedCount++;
};

/**
 * Increases the number of emitted event count
 */
KangaBaseNode.prototype.setEmittedCount = function () {
    this.emittedCount++;
};

/**
 * Increases the number of failed emit event count
 */
KangaBaseNode.prototype.setFailedCount = function () {
    this.failedCount++;
};

/**
 * Sets the latest error message
 * @param {string} errorMessage - The error message of this node
 */
KangaBaseNode.prototype.setErrorMessage = function (errorMessage) {
    this.errorMessage = errorMessage;
};

/**
 * Gets the status of this node
 * @returns {Object}
 */
KangaBaseNode.prototype.getNodeStatus = function () {
    var nodeInfo = {};
    nodeInfo['emittedCount'] = this.emittedCount;
    nodeInfo['failedCount'] = this.failedCount;
    nodeInfo['receivedCount'] = this.receivedCount;
    nodeInfo['errorMessage'] = this.errorMessage;
    return nodeInfo;
};

/**
 * The public execute method including commom logic for every event
 * @param {Object} _event
 */
KangaBaseNode.prototype.execute = function (_event) {
    this.setReceivedCount();
    try {
        // extract each field from _event
        this.event = _event;
        this.root = _event.root;
        this.header = this.root._header_;
        this.messageName = this.header.name;
        this.eventType = Number(this.header.type);
        this.message = this.root[this.messageName];

        // execute algorithm written by the derived node
        this.event = this._execute();

        // change output name if needed
        if (this.event !== null) {
            this.setEmittedCount();
            if (this.outputName !== undefined && this.outputName !== this.messageName) {
                this.klogger.debug('KangaBaseNode: messageName is changed ' +
                        JSON.stringify(this.messageName) + ' to ' + JSON.stringify(this.outputName));
                this.header.name = this.outputName;
                this.root[this.outputName] = this.message;
                delete this.root[this.messageName];
            }
        }
        // emit event to event-emitter
        return this.event;
    } catch (e) {
        this.klogger.error('KangaBaseNode: execute failed ' + e.message);
        this.setFailedCount();
        this.setErrorMessage(e.message);
    }
};

/**
 * The pre-declaration of the private _execute method for the derived node
 */
KangaBaseNode.prototype._execute = function () {

};

module.exports = KangaBaseNode;