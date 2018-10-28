var Utils2 = /** @class */ (function () {
    function Utils2() {
    }
    Utils2.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };
    Utils2.round = function (val, precition) {
        var n = Math.pow(10, precition);
        return Math.round(val * n) / n;
    };
    Utils2.roundArray = function (arr, precition) {
        var result = [];
        for (var i = 0; i < arr.length; i++)
            result.push(this.round(arr[i], precition));
        return result;
    };
    Utils2.formatArray = function (arr) {
        if (arr.length > 1)
            return "[" + arr.join('; ') + "]";
        else
            return arr.toString();
    };
    Utils2.sqr = function (val) {
        return val * val;
    };
    return Utils2;
}());
var Interval = /** @class */ (function () {
    function Interval(_start, _end, _endInclusive) {
        if (_endInclusive === void 0) { _endInclusive = false; }
        var _this = this;
        this.startInclusice = true;
        this.toString = function () {
            return (_this.startInclusice ? "[" : "(") + Utils2.round(_this.start, 2) + ", " +
                Utils2.round(_this.end, 2) + (_this.endInclusive ? "]" : ")");
        };
        this.start = _start;
        this.end = _end;
        this.endInclusive = _endInclusive;
    }
    return Interval;
}());
var App2 = /** @class */ (function () {
    function App2(dataRowId) {
        //public data: number[] = [-4.4, -4.2, -3.6, -2.4, -2, -0.6, -0.6, -0.2, -0.2, 0.4, 0.6, 1.4, 2.4, 2.6, 2.6];
        this.data = [-5, -5, -5, -5, -5, -4.6, -4.6, -4.6, -4.4, -4.4, -4.4, -4.4, -4.2, -4.2, -4.2, -4.2, -4.2, -4, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.4, -3.4, -3.4, -3.4, -3.2, -3.2, -3.2, -3.2, -3.2, -3.2, -3, -2.6, -2.6, -2.6, -2.4, -2.4, -2.4, -2.4, -2.2, -2, -2.2, -2.2, -2.2, -2, -1.6, -1.6, -1.6, -1.4, -1.4, -1.4, -1.2, -1.2, -1.2, -1.2, -1.2, -1.2, -1, -0.6, -0.6, -0.6, -0.4, -0.4, -0.4, -0.4, -0.2, -0.2, -0.2, -0.2, -0.2, 0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.4, 1.4, 1.4, 1.6, 1.6, 1.6, 2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.4, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.4, 3.4, 3.4, 3.4, 3.6, 3.6, 3.6, 4, 4.2, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.4, 4.4, 4.6, 4.6, 4.6, 4.6, 4.6, 5, 5, 5, 5];
        this.precition = 2;
        this.momentCount = 3;
        this.dataRow = $('#' + dataRowId);
        if (!this.dataRow)
            console.error('Invalid dataRowId: ' + dataRowId);
        this.propCalculator = new PropCalculator2(this.data);
        this.chartHandler = new ChartHandler2();
        this.writeDataSet();
        this.updateResult();
    }
    App2.prototype.readDataSet = function () {
        this.data = [];
        var self = this;
        this.dataRow.find('input').each(function (index) {
            var val = parseFloat($(this).val());
            if (!isNaN(val))
                self.data.push(val);
        });
        return this.data;
    };
    App2.prototype.writeDataSet = function () {
        this.dataRow.children('td').remove();
        var self = this;
        this.data.forEach(function (val) {
            self.dataRow.append(self.createNewElementContent(val));
        });
    };
    App2.prototype.writeMap = function (keyRowId, valRowId, keys, values) {
        var keyRow = $('#' + keyRowId);
        var valRow = $('#' + valRowId);
        keyRow.children('td').remove();
        valRow.children('td').remove();
        for (var i = 0; i < keys.length; i++) {
            keyRow.append(this.createNewCellContent(keys[i]));
            valRow.append(this.createNewCellContent(values[i]));
        }
    };
    App2.prototype.updateResult = function () {
        this.chartHandler.deleteCharts();
        this.propCalculator = new PropCalculator2(this.data);
        console.log('calc');
        this.writeMap('rowByFrequencyVar', 'rowByFrequencyValue', this.propCalculator.uniqueVariants, this.propCalculator.frequencyValues);
        this.writeMap('rowByRelativeFrequencyVar', 'rowByRelativeFrequencyValue', this.propCalculator.uniqueVariants, Utils2.roundArray(this.propCalculator.relativeFrequencyValues, this.precition));
        this.writeMap('rowDiscreteVar', 'rowDiscreteValue', this.propCalculator.uniqueVariants, Utils2.roundArray(this.propCalculator.discreteValues, this.precition));
        $('#avgEmpirical')[0].innerText =
            Utils2.round(this.propCalculator.avgEmpirical, this.precition).toString();
        $('#moda')[0].innerText =
            Utils2.formatArray(Utils2.roundArray(this.propCalculator.moda, this.precition));
        $('#mediana')[0].innerText =
            Utils2.round(this.propCalculator.mediana, this.precition).toString();
        $('#width')[0].innerText =
            Utils2.round(this.propCalculator.width, this.precition).toString();
        $('#dispersion')[0].innerText =
            Utils2.round(this.propCalculator.dispersion, this.precition).toString();
        $('#avgSqrDeviation')[0].innerText =
            Utils2.round(this.propCalculator.avgSqrDeviation, this.precition).toString();
        $('#variation')[0].innerText =
            Utils2.round(this.propCalculator.variation, this.precition).toString();
        $('#asymetry')[0].innerText =
            Utils2.round(this.propCalculator.asymetry, this.precition).toString();
        $('#excess')[0].innerText =
            Utils2.round(this.propCalculator.excess, this.precition).toString();
        for (var i = 0; i <= this.momentCount; i++) {
            $('#startEmpiricalMoment' + i)[0].innerText =
                Utils2.round(this.propCalculator.getStartEmpiricalMoment(i), this.precition).toString();
            $('#centralEmpiricalMoment' + i)[0].innerText =
                Utils2.round(this.propCalculator.getCentaralEmpiricalMoment(i), this.precition).toString();
        }
        //this.chartHandler.updateFrequencyPolygon(this.data[0] - 2, this.data[this.data.length - 1] + 2,
        //    this.propCalculator.getFrequencyPolygonData());
        //this.chartHandler.updateFrequencyPolygonRelative(this.data[0] - 2, this.data[this.data.length - 1] + 2,
        //    this.propCalculator.getFrequencyPolygonRelativeData());
        this.chartHandler.updateComulativeCurve(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getComulativeCurveData());
        this.chartHandler.updateComulativeCurveRelative(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getComulativeCurveRelativeData());
        this.chartHandler.updateEmpiricalDistribution(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getEmpiricalDistributionData());
    };
    App2.prototype.createNewElementContent = function (value) {
        return "<td><input class='form-control' type='number' value='" + value + "'/></td>";
    };
    App2.prototype.createNewCellContent = function (value) {
        return "<td>" + value + "</td>";
    };
    return App2;
}());
var PropCalculator2 = /** @class */ (function () {
    function PropCalculator2(data) {
        this.data = data;
        this.amount = data.length;
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
    }
    PropCalculator2.prototype.getIntervalSize = function () {
        this.dataMin = Math.min.apply(null, this.data);
        this.dataMax = Math.max.apply(null, this.data);
        this.intervalCount = 1 + 3.322 * Math.log(this.data.length);
        this.intervalSize =
            (this.dataMax - this.dataMin) / this.intervalCount;
        return this.intervalSize;
    };
    PropCalculator2.prototype.getFrequencyMap = function () {
        this.frequencyMap = {};
        this.uniqueVariants = [];
        this.amountOfVariables = 0;
        this.dataIntervals = [];
        this.discreteValues = [];
        var intervalStart = this.dataMin;
        for (var i = 0; i < this.intervalCount - 1; i++) {
            this.dataIntervals[i] = new Interval(intervalStart, intervalStart + this.intervalSize);
            this.discreteValues.push((this.dataIntervals[i].end - this.dataIntervals[i].start) / 2);
            intervalStart += this.intervalSize;
        }
        this.dataIntervals[Math.floor(this.intervalCount)] = new Interval(intervalStart, this.dataMax, true);
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
    PropCalculator2.prototype.getRelativeFrequencyMap = function () {
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
    PropCalculator2.prototype.getAvgEmpiricalValue = function () {
        this.avgEmpirical = 0;
        for (var i = 0; i < this.data.length; i++)
            this.avgEmpirical += this.data[i];
        this.avgEmpirical /= this.amount;
        return this.avgEmpirical;
    };
    PropCalculator2.prototype.getModa = function () {
        this.maxEntries = -1;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key) && this.frequencyMap[key] > this.maxEntries)
                this.maxEntries = this.frequencyMap[key];
        this.moda = [];
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key) && this.frequencyMap[key] == this.maxEntries)
                this.moda.push(parseFloat(key));
        return this.moda;
    };
    PropCalculator2.prototype.getMediana = function () {
        var midPoint = this.data.length / 2;
        if (Math.floor(midPoint) == midPoint)
            this.mediana = this.data[midPoint];
        else
            this.mediana = (this.data[Math.floor(midPoint)] + this.data[Math.round(midPoint)]) / 2;
        return this.mediana;
    };
    PropCalculator2.prototype.getWidth = function () {
        this.width = this.data[this.data.length - 1] - this.data[0];
        return this.width;
    };
    PropCalculator2.prototype.getDispersion = function () {
        this.dispersion = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                this.dispersion += Utils2.sqr(parseFloat(key))
                    * this.frequencyMap[key];
        this.dispersion /= this.data.length;
        this.dispersion -= Utils2.sqr(this.avgEmpirical);
        //using momments returns the same value
        //this.dispersion = this.getStartEmpiricalMoment(2) - Utils2.sqr(this.getStartEmpiricalMoment(1));
        return this.dispersion;
    };
    PropCalculator2.prototype.getDeviation = function () {
        this.avgSqrDeviation = Math.sqrt(this.dispersion);
        return this.avgSqrDeviation;
    };
    PropCalculator2.prototype.getVariation = function () {
        this.variation = this.avgSqrDeviation / this.avgEmpirical * 100;
        return this.variation;
    };
    PropCalculator2.prototype.getStartEmpiricalMoment = function (exponent) {
        var moment = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                moment += Math.pow(parseFloat(key), exponent)
                    * this.frequencyMap[key];
        return moment / this.data.length;
    };
    PropCalculator2.prototype.getCentaralEmpiricalMoment = function (exponent) {
        var moment = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                moment += Math.pow(parseFloat(key) - this.avgEmpirical, exponent)
                    * this.frequencyMap[key];
        return moment / this.data.length;
    };
    PropCalculator2.prototype.getAsymetry = function () {
        this.asymetry = this.getCentaralEmpiricalMoment(3) / this.avgSqrDeviation;
        return this.asymetry;
    };
    PropCalculator2.prototype.getExcess = function () {
        this.excess = this.getCentaralEmpiricalMoment(4) / Math.pow(this.avgSqrDeviation, 4) - 3;
        return this.excess;
    };
    PropCalculator2.prototype.getFrequencyPolygonData = function () {
        var data = [];
        for (var i = 0; i < this.amountOfVariables; i++)
            data.push({
                x: this.uniqueVariants[i],
                y: Utils2.round(this.frequencyMap[this.uniqueVariants[i]], 3)
            });
        return data;
    };
    PropCalculator2.prototype.getFrequencyPolygonRelativeData = function () {
        var data = [];
        for (var i = 0; i < this.amountOfVariables; i++)
            data.push({
                x: this.uniqueVariants[i],
                y: Utils2.round(this.relativeFrequencyMap[this.uniqueVariants[i]], 3)
            });
        return data;
    };
    PropCalculator2.prototype.getComulativeCurveData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.frequencyMap[this.uniqueVariants[i]];
            data.push({
                x: this.uniqueVariants[i],
                y: Utils2.round(funcVal, 3)
            });
        }
        return data;
    };
    PropCalculator2.prototype.getComulativeCurveRelativeData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.relativeFrequencyMap[this.uniqueVariants[i]];
            data.push({
                x: this.uniqueVariants[i],
                y: Utils2.round(funcVal, 3)
            });
        }
        return data;
    };
    PropCalculator2.prototype.getEmpiricalDistributionData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            data.push({
                x: this.uniqueVariants[i],
                y: Utils2.round(funcVal, 3)
            });
            funcVal += this.frequencyMap[this.uniqueVariants[i]] / this.amount;
        }
        return data;
    };
    return PropCalculator2;
}());
var ChartHandler2 = /** @class */ (function () {
    function ChartHandler2() {
    }
    ChartHandler2.prototype.deleteCharts = function () {
        if (this.frequencyPolygonChart)
            // @ts-ignore
            this.frequencyPolygonChart.destroy();
        if (this.frequencyPolygonRelativeChart)
            // @ts-ignore
            this.frequencyPolygonRelativeChart.destroy();
        if (this.comulativeCurveChart)
            // @ts-ignore
            this.comulativeCurveChart.destroy();
        if (this.comulativeCurveRelativeChart)
            // @ts-ignore
            this.comulativeCurveRelativeChart.destroy();
        if (this.empiricalDistibutionChart)
            // @ts-ignore
            this.empiricalDistibutionChart.destroy();
    };
    ChartHandler2.prototype.updateFrequencyPolygon = function (xMin, xMax, data) {
        var chart = document.getElementById('frequencyPolygon');
        // @ts-ignore
        this.frequencyPolygonChart = new Chart(chart.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                        showLine: true,
                        fill: false,
                        tension: 0,
                        data: data,
                        borderColor: [
                            'rgba(0,0,255,1)'
                        ],
                        borderWidth: 2,
                        pointBackgroundColor: '#0000ff',
                        pointBorderColor: '#0000ff'
                    }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            position: 'bottom',
                            type: 'linear',
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                max: xMax,
                                min: xMin
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Xᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                min: 0,
                                max: 2.0001
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'mᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }]
                },
            }
        });
    };
    ChartHandler2.prototype.updateFrequencyPolygonRelative = function (xMin, xMax, data) {
        var chart = document.getElementById('frequencyPolygonRelative');
        // @ts-ignore
        this.frequencyPolygonRelativeChart = new Chart(chart.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                        showLine: true,
                        fill: false,
                        tension: 0,
                        data: data,
                        borderColor: [
                            'rgba(0,0,255,1)'
                        ],
                        borderWidth: 2,
                        pointBackgroundColor: '#0000ff',
                        pointBorderColor: '#0000ff'
                    }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            position: 'bottom',
                            type: 'linear',
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                max: xMax,
                                min: xMin
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Xᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                min: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'p*ᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }]
                },
            }
        });
    };
    ChartHandler2.prototype.updateComulativeCurve = function (xMin, xMax, data) {
        var chart = document.getElementById('comulativeCurve');
        // @ts-ignore
        this.comulativeCurveChart = new Chart(chart.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                        showLine: true,
                        fill: false,
                        tension: 0,
                        data: data,
                        borderColor: [
                            'rgba(0,0,255,1)'
                        ],
                        borderWidth: 2,
                        pointBackgroundColor: '#0000ff',
                        pointBorderColor: '#0000ff'
                    }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            position: 'bottom',
                            type: 'linear',
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                max: xMax,
                                min: xMin
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Xᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                min: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '∑mᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }]
                },
            }
        });
    };
    ChartHandler2.prototype.updateComulativeCurveRelative = function (xMin, xMax, data) {
        var chart = document.getElementById('comulativeCurveRelative');
        // @ts-ignore
        this.comulativeCurveRelativeChart = new Chart(chart.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                        showLine: true,
                        fill: false,
                        tension: 0,
                        data: data,
                        borderColor: [
                            'rgba(0,0,255,1)'
                        ],
                        borderWidth: 2,
                        pointBackgroundColor: '#0000ff',
                        pointBorderColor: '#0000ff'
                    }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            position: 'bottom',
                            type: 'linear',
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                max: xMax,
                                min: xMin
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Xᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                min: 0,
                                max: 1.0001
                            },
                            scaleLabel: {
                                display: true,
                                labelString: '∑p*ᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }]
                },
            }
        });
    };
    ChartHandler2.prototype.updateEmpiricalDistribution = function (xMin, xMax, data) {
        var chart = document.getElementById('empiricalDistibution');
        var datasets = [{
                showLine: true,
                fill: false,
                tension: 0,
                data: [{
                        //@ts-ignore
                        x: data[0] - xMax + xMin,
                        //@ts-ignore
                        y: 0
                    }, {
                        //@ts-ignore
                        x: data[0],
                        //@ts-ignore
                        y: 0
                    }],
                borderColor: [
                    'rgba(0,0,255,1)'
                ],
                borderWidth: 4,
                pointBackgroundColor: ['#fff', '#0000ff'],
                pointBorderColor: ['#fff', '#0000ff']
            }];
        for (var i = 1; i < data.length; i++) {
            datasets.push({
                showLine: true,
                fill: false,
                tension: 0,
                data: [{
                        //@ts-ignore
                        x: data[i - 1].x,
                        //@ts-ignore
                        y: data[i].y
                    }, {
                        //@ts-ignore
                        x: data[i].x,
                        //@ts-ignore
                        y: data[i].y
                    }],
                borderColor: [
                    'rgba(0,0,255,1)'
                ],
                borderWidth: 2,
                pointBackgroundColor: ['#fff', '#0000ff'],
                pointBorderColor: ['#fff', '#0000ff']
            });
        }
        datasets.push({
            showLine: true,
            fill: false,
            tension: 0,
            data: [{
                    //@ts-ignore
                    x: data[data.length - 1],
                    //@ts-ignore
                    y: 1
                }, {
                    //@ts-ignore
                    x: data[data.length - 1] + xMax - xMin,
                    //@ts-ignore
                    y: 1
                }],
            borderColor: [
                'rgba(0,0,255,1)'
            ],
            borderWidth: 4,
            pointBackgroundColor: ['#fff', '#0000ff'],
            pointBorderColor: ['#fff', '#0000ff']
        });
        // @ts-ignore
        this.empiricalDistibutionChart = new Chart(chart.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: datasets
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            position: 'bottom',
                            type: 'linear',
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                max: xMax,
                                min: xMin
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Xᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                max: 1,
                                min: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'F*(x)',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }]
                },
            }
        });
    };
    return ChartHandler2;
}());
//# sourceMappingURL=App2.js.map