"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };
    Utils.round = function (val, precition) {
        var n = Math.pow(10, precition);
        return Math.round(val * n) / n;
    };
    Utils.roundArray = function (arr, precition) {
        var result = [];
        for (var i = 0; i < arr.length; i++)
            result.push(this.round(arr[i], precition));
        return result;
    };
    Utils.formatArray = function (arr) {
        if (arr.length > 1)
            return "[" + arr.join('; ') + "]";
        else
            return arr.toString();
    };
    Utils.sqr = function (val) {
        return val * val;
    };
    return Utils;
}());
exports.Utils = Utils;
exports.default = Utils;
//# sourceMappingURL=UtilsModule.js.map