"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropCalculator = /** @class */ (function () {
    function PropCalculator(data) {
        this.data = data;
    }
    PropCalculator.prototype.getFrequencyMap = function () {
        this.frequencyMap = [];
        for (var i = 0; i < this.data.length; i++)
            if (this.frequencyMap[this.data[i]])
                this.frequencyMap[this.data[i]]++;
            else
                this.frequencyMap[this.data[i]] = 1;
        return this.frequencyMap;
    };
    return PropCalculator;
}());
exports.PropCalculator = PropCalculator;
//# sourceMappingURL=PropCalculator.js.map