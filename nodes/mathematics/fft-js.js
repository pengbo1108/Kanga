var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var fft = require('fft-js').fft;

function FFTJS(params) {
    kangaBaseNode.call(this, params);
}

extend(FFTJS, kangaBaseNode);


FFTJS.prototype._execute = function () {
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
                var phasors = fft(signal);
                console.log(i, 'fft-js', signal[0], signal.length, phasors.length);
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

module.exports = FFTJS;