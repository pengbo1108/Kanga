var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var mlfft = require("ml-fft").FFT;

function MLFFT(params) {
    kangaBaseNode.call(this, params);
}

extend(MLFFT, kangaBaseNode);


MLFFT.prototype._execute = function () {
    switch (this.eventType) {
        case KANGA_EVENT.DATA:
            break;
        case KANGA_EVENT.COLLECTION:
            for (var i  in this.message) {
                var obj = this.message[i];
                //console.log('message[i]', this.message[i]);

                var signal = Object.keys(obj).map(function (k) {
                    return obj[k];
                });
                
                var im = new Array(signal.length);
                mlfft.fft(signal, im);
                console.log(i, 'ml-fft', signal[0], signal.length, im.length);
                //console.log('phasors', phasors);
            }
            break;
        case KANGA_EVENT.TIME_TICK:
            break;
        case KANGA_EVENT.EOF:
            break;
        case KANGA_EVENT.SYSTEM_LOG:
            break;
        default:
            break;
    }
    return null;
    //return this.event;
};

module.exports = MLFFT;