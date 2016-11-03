var kangaBaseNode = require('../common/kanga-base-node');
var extend = require('../../utils/kanga-common').extend;
var KANGA_EVENT = require('../../constants/kanga-event-type');
var mlfft = require("ml-fft").FFT;

function MINIFFT(params) {
    kangaBaseNode.call(this, params);
}

extend(MINIFFT, kangaBaseNode);

function miniFFT(re, im) {
    var N = re.length;
    for (var i = 0; i < N; i++) {
        for (var j = 0, h = i, k = N; k >>= 1; h >>= 1)
            j = (j << 1) | (h & 1);
        if (j > i) {
            re[j] = [re[i], re[i] = re[j]][0]
            im[j] = [im[i], im[i] = im[j]][0]
        }
    }
    for (var hN = 1; hN * 2 <= N; hN *= 2)
        for (var i = 0; i < N; i += hN * 2)
            for (var j = i; j < i + hN; j++) {
                var cos = Math.cos(Math.PI * (j - i) / hN),
                        sin = Math.sin(Math.PI * (j - i) / hN)
                var tre = re[j + hN] * cos + im[j + hN] * sin,
                        tim = -re[j + hN] * sin + im[j + hN] * cos;
                re[j + hN] = re[j] - tre;
                im[j + hN] = im[j] - tim;
                re[j] += tre;
                im[j] += tim;
            }
}


MINIFFT.prototype._execute = function () {
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
                miniFFT(signal, im);
                console.log(i, 'minifft', signal[0], signal.length, im.length);
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

module.exports = MINIFFT;