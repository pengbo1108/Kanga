function extend(subClass, superClass) {
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass._prototype = superClass.prototype;

    if (superClass.prototype.constructor === Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

function clone(obj) {
    if (typeof obj === 'object') {
        var newObj = {};
        var attr;
        for (attr in obj) {
            newObj[attr] = clone(obj[attr]);
        }
        return newObj;
    } else {
        return obj;
    }
}

exports.extend = extend;
exports.clone = clone;