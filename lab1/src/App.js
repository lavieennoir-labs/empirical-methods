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
var App = /** @class */ (function () {
    function App(dataRowId) {
        this.data = [-5, -5, -5, -5, -5, -4.6, -4.6, -4.6, -4.4, -4.4, -4.4, -4.4, -4.2, -4.2, -4.2, -4.2, -4.2, -4, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.4, -3.4, -3.4, -3.4, -3.2, -3.2, -3.2, -3.2, -3.2, -3.2, -3, -2.6, -2.6, -2.6, -2.4, -2.4, -2.4, -2.4, -2.2, -2, -2.2, -2.2, -2.2, -2, -1.6, -1.6, -1.6, -1.4, -1.4, -1.4, -1.2, -1.2, -1.2, -1.2, -1.2, -1.2, -1, -0.6, -0.6, -0.6, -0.4, -0.4, -0.4, -0.4, -0.2, -0.2, -0.2, -0.2, -0.2, 0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.4, 1.4, 1.4, 1.6, 1.6, 1.6, 2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.4, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.4, 3.4, 3.4, 3.4, 3.6, 3.6, 3.6, 4, 4.2, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.4, 4.4, 4.6, 4.6, 4.6, 4.6, 4.6, 5, 5, 5, 5];
        this.precition = 3;
        this.momentCount = 3;
        this.dataRow = $('#' + dataRowId);
        if (!this.dataRow)
            console.error('Invalid dataRowId: ' + dataRowId);
        this.propCalculator = new PropCalculator(this.data);
        this.chartHandler = new ChartHandler();
        this.writeDataSet();
        this.updateResult();
    }
    App.prototype.readDataSet = function () {
        this.data = [];
        var self = this;
        this.dataRow.find('input').each(function (index) {
            var val = parseFloat($(this).val());
            if (!isNaN(val))
                self.data.push(val);
        });
        return this.data;
    };
    App.prototype.writeDataSet = function () {
        this.dataRow.children('td').remove();
        var self = this;
        this.data.forEach(function (val) {
            self.dataRow.append(self.createNewElementContent(val));
        });
    };
    App.prototype.writeMap = function (keyRowId, valRowId, keys, values) {
        var keyRow = $('#' + keyRowId);
        var valRow = $('#' + valRowId);
        keyRow.children('td').remove();
        valRow.children('td').remove();
        for (var i = 0; i < keys.length; i++) {
            keyRow.append(this.createNewCellContent(keys[i]));
            valRow.append(this.createNewCellContent(values[i]));
        }
    };
    App.prototype.updateResult = function () {
        this.propCalculator = new PropCalculator(this.data);
        this.writeMap('rowByFrequencyVar', 'rowByFrequencyValue', this.propCalculator.uniqueVariants, this.propCalculator.frequencyValues);
        this.writeMap('rowByRelativeFrequencyVar', 'rowByRelativeFrequencyValue', this.propCalculator.uniqueVariants, Utils.roundArray(this.propCalculator.relativeFrequencyValues, this.precition));
        $('#avgEmpirical')[0].innerText =
            Utils.round(this.propCalculator.avgEmpirical, this.precition).toString();
        $('#moda')[0].innerText =
            Utils.formatArray(Utils.roundArray(this.propCalculator.moda, this.precition));
        $('#mediana')[0].innerText =
            Utils.round(this.propCalculator.mediana, this.precition).toString();
        $('#width')[0].innerText =
            Utils.round(this.propCalculator.width, this.precition).toString();
        $('#dispersion')[0].innerText =
            Utils.round(this.propCalculator.dispersion, this.precition).toString();
        $('#avgSqrDeviation')[0].innerText =
            Utils.round(this.propCalculator.avgSqrDeviation, this.precition).toString();
        $('#variation')[0].innerText =
            Utils.round(this.propCalculator.variation, this.precition).toString();
        $('#asymetry')[0].innerText =
            Utils.round(this.propCalculator.asymetry, this.precition).toString();
        $('#excess')[0].innerText =
            Utils.round(this.propCalculator.excess, this.precition).toString();
        for (var i = 1; i <= this.momentCount; i++) {
            $('#startEmpiricalMoment' + i)[0].innerText =
                Utils.round(this.propCalculator.getStartEmpiricalMoment(i), this.precition).toString();
            $('#centralEmpiricalMoment' + i)[0].innerText =
                Utils.round(this.propCalculator.getCentaralEmpiricalMoment(i), this.precition).toString();
        }
        this.chartHandler.updateFrequencyPolygon(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getFrequencyPolygonData());
        this.chartHandler.updateFrequencyPolygonRelative(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getFrequencyPolygonRelativeData());
        this.chartHandler.updateComulativeCurve(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getComulativeCurveData());
        this.chartHandler.updateComulativeCurveRelative(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getComulativeCurveRelativeData());
        this.chartHandler.updateEmpiricalDistribution(this.data[0] - 2, this.data[this.data.length - 1] + 2, this.propCalculator.getEmpiricalDistributionData());
    };
    App.prototype.createNewElementContent = function (value) {
        return "<td><input class='form-control' type='number' value='" + value + "'/></td>";
    };
    App.prototype.createNewCellContent = function (value) {
        return "<td>" + value + "</td>";
    };
    return App;
}());
var PropCalculator = /** @class */ (function () {
    function PropCalculator(data) {
        this.data = data;
        this.amount = data.length;
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
    PropCalculator.prototype.getFrequencyMap = function () {
        this.frequencyMap = {};
        this.uniqueVariants = [];
        this.amountOfVariables = 0;
        for (var i = 0; i < this.data.length; i++)
            if (this.frequencyMap[this.data[i]])
                this.frequencyMap[this.data[i]]++;
            else {
                this.frequencyMap[this.data[i]] = 1;
                this.uniqueVariants.push(this.data[i]);
                this.amountOfVariables++;
            }
        return this.frequencyMap;
    };
    PropCalculator.prototype.getRelativeFrequencyMap = function () {
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
    PropCalculator.prototype.getAvgEmpiricalValue = function () {
        this.avgEmpirical = 0;
        for (var i = 0; i < this.data.length; i++)
            this.avgEmpirical += this.data[i];
        this.avgEmpirical /= this.amount;
        return this.avgEmpirical;
    };
    PropCalculator.prototype.getModa = function () {
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
    PropCalculator.prototype.getMediana = function () {
        var midPoint = this.data.length / 2;
        if (Math.floor(midPoint) == midPoint)
            this.mediana = this.data[midPoint];
        else
            this.mediana = (this.data[Math.floor(midPoint)] + this.data[Math.round(midPoint)]) / 2;
        return this.mediana;
    };
    PropCalculator.prototype.getWidth = function () {
        this.width = this.data[this.data.length - 1] - this.data[0];
        return this.width;
    };
    PropCalculator.prototype.getDispersion = function () {
        this.dispersion = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                this.dispersion += Utils.sqr(parseFloat(key))
                    * this.frequencyMap[key];
        this.dispersion /= this.data.length;
        this.dispersion -= Utils.sqr(this.avgEmpirical);
        //using momments returns the same value
        //this.dispersion = this.getStartEmpiricalMoment(2) - Utils.sqr(this.getStartEmpiricalMoment(1));
        return this.dispersion;
    };
    PropCalculator.prototype.getDeviation = function () {
        this.avgSqrDeviation = Math.sqrt(this.dispersion);
        return this.avgSqrDeviation;
    };
    PropCalculator.prototype.getVariation = function () {
        this.variation = this.avgSqrDeviation / this.avgEmpirical * 100;
        return this.variation;
    };
    PropCalculator.prototype.getStartEmpiricalMoment = function (exponent) {
        var moment = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                moment += Math.pow(parseFloat(key), exponent)
                    * this.frequencyMap[key];
        return moment / this.data.length;
    };
    PropCalculator.prototype.getCentaralEmpiricalMoment = function (exponent) {
        var moment = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                moment += Math.pow(parseFloat(key) - this.avgEmpirical, exponent)
                    * this.frequencyMap[key];
        return moment / this.data.length;
    };
    PropCalculator.prototype.getAsymetry = function () {
        this.asymetry = this.getCentaralEmpiricalMoment(3) / this.avgSqrDeviation;
        return this.asymetry;
    };
    PropCalculator.prototype.getExcess = function () {
        this.excess = this.getCentaralEmpiricalMoment(4) / Math.pow(this.avgSqrDeviation, 4) - 3;
        return this.excess;
    };
    PropCalculator.prototype.getFrequencyPolygonData = function () {
        var data = [];
        for (var i = 0; i < this.amountOfVariables; i++)
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(this.frequencyMap[this.uniqueVariants[i]], 3)
            });
        return data;
    };
    PropCalculator.prototype.getFrequencyPolygonRelativeData = function () {
        var data = [];
        for (var i = 0; i < this.amountOfVariables; i++)
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(this.relativeFrequencyMap[this.uniqueVariants[i]], 3)
            });
        return data;
    };
    PropCalculator.prototype.getComulativeCurveData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.frequencyMap[this.uniqueVariants[i]];
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(funcVal, 3)
            });
        }
        return data;
    };
    PropCalculator.prototype.getComulativeCurveRelativeData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.relativeFrequencyMap[this.uniqueVariants[i]];
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(funcVal, 3)
            });
        }
        return data;
    };
    PropCalculator.prototype.getEmpiricalDistributionData = function () {
        var data = [];
        var funcVal = 0;
        for (var i = 0; i < this.amountOfVariables; i++) {
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(funcVal, 3)
            });
            funcVal += this.frequencyMap[this.uniqueVariants[i]] / this.amount;
        }
        return data;
    };
    return PropCalculator;
}());
var ChartHandler = /** @class */ (function () {
    function ChartHandler() {
    }
    ChartHandler.prototype.updateFrequencyPolygon = function (xMin, xMax, data) {
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
                                min: 0
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
    ChartHandler.prototype.updateFrequencyPolygonRelative = function (xMin, xMax, data) {
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
    ChartHandler.prototype.updateComulativeCurve = function (xMin, xMax, data) {
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
    ChartHandler.prototype.updateComulativeCurveRelative = function (xMin, xMax, data) {
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
                                min: 0
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
    ChartHandler.prototype.updateEmpiricalDistribution = function (xMin, xMax, data) {
        var chart = document.getElementById('empiricalDistibution');
        var datasets = [{
                showLine: true,
                fill: false,
                tension: 0,
                data: [{
                        //@ts-ignore
                        x: data[0].x - xMax + xMin,
                        //@ts-ignore
                        y: 0
                    }, {
                        //@ts-ignore
                        x: data[0].x,
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
                    x: data[data.length - 1].x,
                    //@ts-ignore
                    y: 1
                }, {
                    //@ts-ignore
                    x: data[data.length - 1].x + xMax - xMin,
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
    return ChartHandler;
}());
//# sourceMappingURL=App.js.map