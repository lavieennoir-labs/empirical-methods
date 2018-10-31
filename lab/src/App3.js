var Utils3 = /** @class */ (function () {
    function Utils3() {
    }
    Utils3.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };
    Utils3.round = function (val, precition) {
        var n = Math.pow(10, precition);
        return Math.round(val * n) / n;
    };
    Utils3.roundArray = function (arr, precition) {
        var result = [];
        for (var i = 0; i < arr.length; i++)
            result.push(this.round(arr[i], precition));
        return result;
    };
    Utils3.formatArray = function (arr) {
        if (arr.length > 1)
            return "[" + arr.join('; ') + "]";
        else
            return arr.toString();
    };
    Utils3.sqr = function (val) {
        return val * val;
    };
    return Utils3;
}());
var Interval = /** @class */ (function () {
    function Interval(_start, _end, _endInclusive) {
        if (_endInclusive === void 0) { _endInclusive = false; }
        var _this = this;
        this.startInclusice = true;
        this.toString = function () {
            return (_this.startInclusice ? "[" : "(") + Utils3.round(_this.start, 3) + ", " +
                Utils3.round(_this.end, 3) + (_this.endInclusive ? "]" : ")");
        };
        this.start = _start;
        this.end = _end;
        this.endInclusive = _endInclusive;
    }
    return Interval;
}());
var App3 = /** @class */ (function () {
    function App3(dataRowId) {
        //public data: number[] = [-4.4, -4.2, -3.6, -2.4, -2, -0.6, -0.6, -0.2, -0.2, 0.4, 0.6, 1.4, 2.4, 2.6, 2.6];
        this.data = [-5, -5, -5, -5, -5, -4.6, -4.6, -4.6, -4.4, -4.4, -4.4, -4.4, -4.2, -4.2, -4.2, -4.2, -4.2, -4, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.4, -3.4, -3.4, -3.4, -3.2, -3.2, -3.2, -3.2, -3.2, -3.2, -3, -2.6, -2.6, -2.6, -2.4, -2.4, -2.4, -2.4, -2.2, -2, -2.2, -2.2, -2.2, -2, -1.6, -1.6, -1.6, -1.4, -1.4, -1.4, -1.2, -1.2, -1.2, -1.2, -1.2, -1.2, -1, -0.6, -0.6, -0.6, -0.4, -0.4, -0.4, -0.4, -0.2, -0.2, -0.2, -0.2, -0.2, 0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.4, 1.4, 1.4, 1.6, 1.6, 1.6, 2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.4, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.4, 3.4, 3.4, 3.4, 3.6, 3.6, 3.6, 4, 4.2, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.4, 4.4, 4.6, 4.6, 4.6, 4.6, 4.6, 5, 5, 5, 5];
        this.precition = 2;
        this.momentCount = 3;
        this.dataRow = $('#' + dataRowId);
        if (!this.dataRow)
            console.error('Invalid dataRowId: ' + dataRowId);
        this.propCalculator = new PropCalculator3(this.data, 0.05);
        this.writeDataSet();
        this.updateResult();
    }
    App3.prototype.readDataSet = function () {
        this.data = [];
        var self = this;
        this.dataRow.find('input').each(function (index) {
            var val = parseFloat($(this).val());
            if (!isNaN(val))
                self.data.push(val);
        });
        return this.data;
    };
    App3.prototype.writeDataSet = function () {
        this.dataRow.children('td').remove();
        var self = this;
        this.data.forEach(function (val) {
            self.dataRow.append(self.createNewElementContent(val));
        });
    };
    App3.prototype.writeMap = function (keyRowId, valRowId, keys, values) {
        var keyRow = $('#' + keyRowId);
        var valRow = $('#' + valRowId);
        keyRow.children('td').remove();
        valRow.children('td').remove();
        for (var i = 0; i < keys.length; i++) {
            keyRow.append(this.createNewCellContent(keys[i]));
            valRow.append(this.createNewCellContent(values[i]));
        }
    };
    App3.prototype.updateResult = function () {
        this.propCalculator = new PropCalculator3(this.data, 0.05);
        $('#intervalForKnownDispersion1')[0].innerText =
            this.propCalculator.intervalForKnownDispersion.toString();
        $('#intervalForUnknownDispersion1')[0].innerText =
            this.propCalculator.intervalForUnknownDispersion.toString();
        $('#intervalForSqrDeviation1')[0].innerText =
            this.propCalculator.intervalForSqrDeviation.toString();
        this.propCalculator = new PropCalculator3(this.data, 0.01);
        $('#intervalForKnownDispersion2')[0].innerText =
            this.propCalculator.intervalForKnownDispersion.toString();
        $('#intervalForUnknownDispersion2')[0].innerText =
            this.propCalculator.intervalForUnknownDispersion.toString();
        $('#intervalForSqrDeviation2')[0].innerText =
            this.propCalculator.intervalForSqrDeviation.toString();
        this.propCalculator = new PropCalculator3(this.data, 0.001);
        $('#intervalForKnownDispersion3')[0].innerText =
            this.propCalculator.intervalForKnownDispersion.toString();
        $('#intervalForUnknownDispersion3')[0].innerText =
            this.propCalculator.intervalForUnknownDispersion.toString();
        $('#intervalForSqrDeviation3')[0].innerText =
            this.propCalculator.intervalForSqrDeviation.toString();
    };
    App3.prototype.createNewElementContent = function (value) {
        return "<td><input class='form-control' type='number' value='" + value + "'/></td>";
    };
    App3.prototype.createNewCellContent = function (value) {
        return "<td>" + value + "</td>";
    };
    return App3;
}());
var PropCalculator3 = /** @class */ (function () {
    function PropCalculator3(data, a) {
        this.LaplaceMap = {};
        this.StudentMap = {};
        this.PirsonMap = {};
        this.data = data;
        this.amount = data.length;
        this.LaplaceMap[0.05] = 1.96; //Ф(t) = 0.95/2 = 0.475
        this.LaplaceMap[0.01] = 2.58; //Ф(t) = 0.99/2 = 0.495
        this.LaplaceMap[0.001] = 3.4; //Ф(t) = 0.999/2 = 0.4995
        this.StudentMap[0.05] = 1.96;
        this.StudentMap[0.01] = 2.576;
        this.StudentMap[0.001] = 3.291;
        this.PirsonMap[0.05] = 0.115;
        this.PirsonMap[0.01] = 0.160;
        this.PirsonMap[0.001] = 0.211;
        this.getIntervalSize();
        this.getFrequencyMap();
        this.getRelativeFrequencyMap();
        this.getAvgEmpiricalValue();
        this.getModa();
        this.getMediana();
        this.getWidth();
        this.getDispersion();
        this.getDeviation();
        this.getVariation();
        this.getAsymetry();
        this.getExcess();
        this.getIntervalForKnownDispersion(0.05);
        this.getIntervalForUnknownDispersion(0.05);
        this.getIntervalForSqrDeviation(0.05);
    }
    PropCalculator3.prototype.getIntervalSize = function () {
        this.dataMin = Math.min.apply(null, this.data);
        this.dataMax = Math.max.apply(null, this.data);
        this.intervalCount = 1 + 3.322 * Utils3.log10(this.data.length);
        this.intervalSize =
            (this.dataMax - this.dataMin) / this.intervalCount;
        return this.intervalSize;
    };
    PropCalculator3.prototype.getFrequencyMap = function () {
        this.frequencyMap = {};
        this.uniqueVariants = [];
        this.amountOfVariables = 0;
        this.dataIntervals = [];
        this.discreteValues = [];
        var intervalStart = this.dataMin;
        for (var i = 0; i < this.intervalCount - 1; i++) {
            this.dataIntervals[i] = new Interval(intervalStart, intervalStart + this.intervalSize);
            this.discreteValues.push((this.dataIntervals[i].end - this.dataIntervals[i].start) / 2 + this.dataIntervals[i].start);
            intervalStart += this.intervalSize;
        }
        this.dataIntervals[Math.floor(this.intervalCount)] = new Interval(intervalStart, this.dataMax, true);
        this.discreteValues.push((this.dataIntervals[Math.floor(this.intervalCount)].end - this.dataIntervals[Math.floor(this.intervalCount)].start) / 2 + this.dataIntervals[Math.floor(this.intervalCount)].start);
        var currentIntervalIdx = 0;
        for (var i = 0; i < this.data.length; i++) {
            while (this.data[i] >= this.dataIntervals[currentIntervalIdx].end && currentIntervalIdx < this.dataIntervals.length - 1)
                currentIntervalIdx++;
            if (this.frequencyMap[this.dataIntervals[currentIntervalIdx].toString()])
                this.frequencyMap[this.dataIntervals[currentIntervalIdx].toString()]++;
            else {
                this.frequencyMap[this.dataIntervals[currentIntervalIdx].toString()] = 1;
                this.uniqueVariants.push(this.dataIntervals[currentIntervalIdx].toString());
                this.amountOfVariables++;
            }
        }
        return this.frequencyMap;
    };
    PropCalculator3.prototype.getRelativeFrequencyMap = function () {
        this.relativeFrequencyMap = {};
        this.frequencyValues = [];
        this.relativeFrequencyValues = [];
        for (var i = 0; i < this.uniqueVariants.length; i++) {
            this.relativeFrequencyMap[this.uniqueVariants[i]] = this.frequencyMap[this.uniqueVariants[i]] / this.amount;
            this.frequencyValues.push(this.frequencyMap[this.uniqueVariants[i]]);
            this.relativeFrequencyValues.push(this.relativeFrequencyMap[this.uniqueVariants[i]]);
        }
        return this.relativeFrequencyMap;
    };
    PropCalculator3.prototype.getAvgEmpiricalValue = function () {
        this.avgEmpirical = 0;
        for (var i = 0; i < this.amountOfVariables; i++)
            this.avgEmpirical += this.relativeFrequencyValues[i] * this.discreteValues[i];
        return this.avgEmpirical;
    };
    PropCalculator3.prototype.getModa = function () {
        this.maxEntries = -1;
        var currentValue = null;
        var currentEntries = 0;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i] != currentValue) {
                currentValue = this.data[i];
                currentEntries = 1;
            }
            else {
                currentEntries++;
            }
            if (currentEntries > this.maxEntries)
                this.maxEntries = currentEntries;
        }
        this.moda = [];
        currentValue = null;
        currentEntries = 0;
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i] != currentValue) {
                currentValue = this.data[i];
                currentEntries = 1;
            }
            else {
                currentEntries++;
            }
            if (currentEntries == this.maxEntries)
                this.moda.push(currentValue);
        }
        var prevModaIntervals = [];
        var modaIntervals = [];
        var postModaIntervals = [];
        for (var j = 0; j < this.moda.length; j++)
            for (var i = 0; i < this.dataIntervals.length; i++)
                if (this.moda[j] >= this.dataIntervals[i].start && this.moda[j] < this.dataIntervals[i].end) {
                    prevModaIntervals.push(this.dataIntervals[i - 1]);
                    modaIntervals.push(this.dataIntervals[i]);
                    postModaIntervals.push(this.dataIntervals[i + 1]);
                    continue;
                }
        var intevalModa = [];
        for (var i = 0; i < modaIntervals.length; i++) {
            intevalModa.push(modaIntervals[i].start + this.intervalSize *
                (this.frequencyMap[modaIntervals[i].toString()] - this.frequencyMap[prevModaIntervals[i].toString()]) /
                (this.frequencyMap[modaIntervals[i].toString()] - this.frequencyMap[prevModaIntervals[i].toString()] - this.frequencyMap[postModaIntervals[i].toString()]));
        }
        this.moda = intevalModa;
        return this.moda;
    };
    PropCalculator3.prototype.getMediana = function () {
        var midPoint = this.data.length / 2;
        if (Math.floor(midPoint) == midPoint)
            this.mediana = this.data[midPoint];
        else
            this.mediana = (this.data[Math.floor(midPoint)] + this.data[Math.round(midPoint)]) / 2;
        var medianIntevalIdx = -1;
        var accumulatedFreq = 0;
        for (var i = 0; i < this.dataIntervals.length; i++)
            if (this.mediana >= this.dataIntervals[i].start && this.mediana < this.dataIntervals[i].end) {
                medianIntevalIdx = i;
                break;
            }
            else {
                accumulatedFreq += this.frequencyMap[this.dataIntervals[i].toString()];
            }
        this.mediana = this.dataIntervals[medianIntevalIdx].start +
            (this.intervalSize / this.frequencyMap[this.dataIntervals[medianIntevalIdx].toString()]) *
                (this.amount / 2 - accumulatedFreq);
        return this.mediana;
    };
    PropCalculator3.prototype.getWidth = function () {
        this.width = this.data[this.data.length - 1] - this.data[0];
        return this.width;
    };
    PropCalculator3.prototype.getDispersion = function () {
        this.dispersion = 0;
        //for(let i = 0; i < this.dataIntervals.length; i++)
        //    this.dispersion += this.relativeFrequencyMap[this.dataIntervals[i].toString()] *
        //        this.discreteValues[i]
        //this.dispersion /= this.data.length;
        //this.dispersion -= Utils3.sqr(this.avgEmpirical);
        //using momments returns the same value
        this.dispersion = this.getStartEmpiricalMoment(2) - Utils3.sqr(this.getStartEmpiricalMoment(1));
        return this.dispersion;
    };
    PropCalculator3.prototype.getDeviation = function () {
        this.avgSqrDeviation = Math.sqrt(this.dispersion);
        return this.avgSqrDeviation;
    };
    PropCalculator3.prototype.getVariation = function () {
        this.variation = this.avgSqrDeviation / this.avgEmpirical * 100;
        return this.variation;
    };
    PropCalculator3.prototype.getStartEmpiricalMoment = function (exponent) {
        var moment = 0;
        for (var i = 0; i < this.dataIntervals.length; i++)
            moment += Math.pow(this.discreteValues[i], exponent)
                * this.frequencyValues[i];
        return moment / this.data.length;
    };
    PropCalculator3.prototype.getCentaralEmpiricalMoment = function (exponent) {
        var moment = 0;
        for (var i = 0; i < this.dataIntervals.length; i++)
            moment += Math.pow(this.discreteValues[i] - this.avgEmpirical, exponent)
                * this.frequencyValues[i];
        return moment / this.data.length;
    };
    PropCalculator3.prototype.getAsymetry = function () {
        this.asymetry = this.getCentaralEmpiricalMoment(3) / this.avgSqrDeviation;
        return this.asymetry;
    };
    PropCalculator3.prototype.getExcess = function () {
        this.excess = this.getCentaralEmpiricalMoment(4) / Math.pow(this.avgSqrDeviation, 4) - 3;
        return this.excess;
    };
    PropCalculator3.prototype.getFrequencyHistogramData = function () {
        var data = [];
        for (var i = 0; i < this.dataIntervals.length; i++)
            data.push(Utils3.round(this.frequencyMap[this.dataIntervals[i].toString()] / this.intervalSize, 2));
        return data;
    };
    PropCalculator3.prototype.getFrequencyHistogramRelativeData = function () {
        var data = [];
        for (var i = 0; i < this.dataIntervals.length; i++)
            data.push(Utils3.round(this.relativeFrequencyMap[this.dataIntervals[i].toString()] / this.intervalSize, 2));
        return data;
    };
    PropCalculator3.prototype.getComulativeCurveData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.dataIntervals.length; i++) {
            funcVal += this.frequencyMap[this.dataIntervals[i].toString()];
            data.push({
                x: i,
                y: Utils3.round(funcVal, 2)
            });
        }
        return data;
    };
    PropCalculator3.prototype.getComulativeCurveRelativeData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.relativeFrequencyMap[this.dataIntervals[i].toString()];
            data.push({
                x: i,
                y: Utils3.round(funcVal, 2)
            });
        }
        return data;
    };
    PropCalculator3.prototype.getEmpiricalDistributionData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.dataIntervals.length; i++) {
            data.push({
                x: Utils3.round(this.discreteValues[i], 2),
                y: Utils3.round(funcVal, 2)
            });
            funcVal += this.frequencyValues[i] / this.amount;
        }
        return data;
    };
    PropCalculator3.prototype.getIntervalForKnownDispersion = function (a) {
        var start = this.avgEmpirical - this.avgSqrDeviation / Math.sqrt(this.amount) * this.LaplaceMap[a];
        var end = this.avgEmpirical + this.avgSqrDeviation / Math.sqrt(this.amount) * this.LaplaceMap[a];
        this.intervalForKnownDispersion = new Interval(start, end, true);
        return this.intervalForKnownDispersion;
    };
    PropCalculator3.prototype.getIntervalForUnknownDispersion = function (a) {
        var start = this.avgEmpirical - this.avgSqrDeviation / Math.sqrt(this.amount) * this.StudentMap[a];
        var end = this.avgEmpirical + this.avgSqrDeviation / Math.sqrt(this.amount) * this.StudentMap[a];
        this.intervalForUnknownDispersion = new Interval(start, end, true);
        return this.intervalForUnknownDispersion;
    };
    PropCalculator3.prototype.getIntervalForSqrDeviation = function (a) {
        var modifiedAvgSqlDeviation = Math.sqrt(this.dispersion * this.amount / (this.amount - 1));
        var start = modifiedAvgSqlDeviation * (1 - this.PirsonMap[a]);
        var end = modifiedAvgSqlDeviation * (1 + this.PirsonMap[a]);
        this.intervalForSqrDeviation = new Interval(start, end, true);
        return this.intervalForSqrDeviation;
    };
    return PropCalculator3;
}());
//# sourceMappingURL=App3.js.map