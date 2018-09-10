class Utils {
    public static log10(x: number): number {
        return Math.log(x) / Math.LN10;
    }
    public static round(val: number, precition: number): number {
        let n = Math.pow(10, precition);
        return Math.round(val * n) / n;
    }
    public static roundArray(arr: number[], precition: number): number[] {
        let result = [];
        for (let i = 0; i < arr.length; i++)
            result.push(this.round(arr[i], precition));
        return result;
    }
    public static formatArray(arr: number[]): string {
        if (arr.length > 1)
            return "[" + arr.join('; ') + "]";
        else
            return arr.toString();
    }
    public static sqr(val: number): number {
        return val * val;
    }
}

class App {
    public data: number[] = [-5, -5, -5, -5, -5, -4.6, -4.6, -4.6, -4.4, -4.4, -4.4, -4.4, -4.2, -4.2, -4.2, -4.2, -4.2, -4, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.4, -3.4, -3.4, -3.4, -3.2, -3.2, -3.2, -3.2, -3.2, -3.2, -3, -2.6, -2.6, -2.6, -2.4, -2.4, -2.4, -2.4, -2.2, -2, -2.2, -2.2, -2.2, -2, -1.6, -1.6, -1.6, -1.4, -1.4, -1.4, -1.2, -1.2, -1.2, -1.2, -1.2, -1.2, -1, -0.6, -0.6, -0.6, -0.4, -0.4, -0.4, -0.4, -0.2, -0.2, -0.2, -0.2, -0.2, 0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.4, 1.4, 1.4, 1.6, 1.6, 1.6, 2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.4, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.4, 3.4, 3.4, 3.4, 3.6, 3.6, 3.6, 4, 4.2, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.4, 4.4, 4.6, 4.6, 4.6, 4.6, 4.6, 5, 5, 5, 5]

    public dataRow: JQuery<HTMLElement>;

    public propCalculator: PropCalculator;
    public chartHandler: ChartHandler;

    public precition: number = 3;
    public momentCount: number = 3;

    constructor(dataRowId: string) {
        this.dataRow = $('#' + dataRowId);
        if (!this.dataRow)
            console.error('Invalid dataRowId: ' + dataRowId);
        this.propCalculator = new PropCalculator(this.data);
        this.chartHandler = new ChartHandler();

        this.writeDataSet();
        this.updateResult();
    }


    public readDataSet(): number[] {
        this.data = [];
        let self = this;
        this.dataRow.find('input').each(function (index: number): void {
            let val: number = parseFloat($(this).val() as string);
            if (!isNaN(val))
                self.data.push(val);
        });
        return this.data;
    }
    public writeDataSet(): void {
        this.dataRow.children('td').remove();
        let self = this;
        this.data.forEach(val => {
            self.dataRow.append(self.createNewElementContent(val));
        });
    }
    public updateResult(): void {
        this.propCalculator = new PropCalculator(this.data);
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
        $('#fixedDispersion')[0].innerText =
            Utils.round(this.propCalculator.fixedDispersion, this.precition).toString();
        $('#fixedAvgSqrDeviation')[0].innerText =
            Utils.round(this.propCalculator.fixedAvgSqrDeviation, this.precition).toString();
        $('#variation')[0].innerText =
            Utils.round(this.propCalculator.variation, this.precition).toString();
        $('#asymetry')[0].innerText =
            Utils.round(this.propCalculator.asymetry, this.precition).toString();
        $('#excess')[0].innerText =
            Utils.round(this.propCalculator.excess, this.precition).toString();
        for (let i = 1; i <= this.momentCount; i++) {
            $('#startEmpiricalMoment' + i)[0].innerText =
                Utils.round(this.propCalculator.getStartEmpiricalMoment(i), this.precition).toString();
            $('#centralEmpiricalMoment' + i)[0].innerText =
                Utils.round(this.propCalculator.getCentaralEmpiricalMoment(i), this.precition).toString();
        }
        this.chartHandler.updateFrequencyPolygon(this.data[0] - 2, this.data[this.data.length - 1] + 2,
            this.propCalculator.getFrequencyPolygonData());
        this.chartHandler.updateComulativeCurve(this.data[0] - 2, this.data[this.data.length - 1] + 2,
            this.propCalculator.getComulativeCurveData());
        this.chartHandler.updateEmpiricalDistribution(this.data[0] - 2, this.data[this.data.length - 1] + 2,
            this.propCalculator.getEmpiricalDistributionData());
    }

    protected createNewElementContent(value: number): string {
        return "<td><input class='form-control' type='number' value='" + value + "'/></td>";
    }
}

class PropCalculator {
    public data: number[];
    public frequencyMap: Object;
    public amountOfVariables: number;
    public amount: number;
    public avgEmpirical: number;
    public moda: number[];
    public maxEntries: number;
    public mediana: number;
    public width: number;
    public dispersion: number;
    public avgSqrDeviation: number;
    public fixedDispersion: number;
    public fixedAvgSqrDeviation: number;
    public variation: number;
    public asymetry: number;
    public excess: number;
    public uniqueVariants: number[];

    constructor(data: number[]) {
        this.data = data
        this.amount = data.length;
        this.getFrequencyMap();
        this.getAvgEmpiricalValue();
        this.getModa();
        this.getMediana();
        this.getWidth();
        this.getDispersion();
        this.getDeviation();
        this.getFixedDispersion();
        this.getFixedDeviation();
        this.getVariation();
        this.getAsymetry();
        this.getExcess();
    }

    public getFrequencyMap(): Object {
        this.frequencyMap = {};
        this.uniqueVariants = [];
        this.amountOfVariables = 0;
        for (let i = 0; i < this.data.length; i++)
            if (this.frequencyMap[this.data[i]])
                this.frequencyMap[this.data[i]]++;
            else {
                this.frequencyMap[this.data[i]] = 1;
                this.uniqueVariants.push(this.data[i]);
                this.amountOfVariables++;
            }
        return this.frequencyMap;
    }

    public getAvgEmpiricalValue(): number {
        this.avgEmpirical = 0;
        for (let i = 0; i < this.data.length; i++)
            this.avgEmpirical += this.data[i];

        this.avgEmpirical /= this.amount;
        return this.avgEmpirical;
    }

    public getModa(): number[] {
        this.maxEntries = -1;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key) && this.frequencyMap[key] > this.maxEntries)
                this.maxEntries = this.frequencyMap[key];

        this.moda = [];
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key) && this.frequencyMap[key] == this.maxEntries)
                this.moda.push(parseFloat(key));
        return this.moda;
    }

    public getMediana(): number {
        let midPoint = this.data.length / 2;
        if (Math.floor(midPoint) == midPoint)
            this.mediana = this.data[midPoint];
        else
            this.mediana = (this.data[Math.floor(midPoint)] + this.data[Math.round(midPoint)]) / 2
        return this.mediana;
    }
    public getWidth(): number {
        this.width = this.data[this.data.length - 1] - this.data[0];
        return this.width;
    }
    public getDispersion(): number {
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
    }
    public getDeviation(): number {
        this.avgSqrDeviation = Math.sqrt(this.dispersion);
        return this.avgSqrDeviation;
    }
    public getFixedDispersion(): number {
        this.fixedDispersion = 0;
        return this.fixedDispersion;
    }
    public getFixedDeviation(): number {
        this.fixedAvgSqrDeviation = 0;
        return this.fixedAvgSqrDeviation;
    }
    public getVariation(): number {
        this.variation = this.avgSqrDeviation / this.avgEmpirical * 100;
        return this.variation;
    }
    public getStartEmpiricalMoment(exponent: number): number {
        let moment = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                moment += Math.pow(parseFloat(key), exponent)
                    * this.frequencyMap[key];
        return moment / this.data.length;
    }
    public getCentaralEmpiricalMoment(exponent: number): number {
        let moment = 0;
        for (var key in this.frequencyMap)
            if (this.frequencyMap.hasOwnProperty(key))
                moment += Math.pow(parseFloat(key) - this.avgEmpirical, exponent)
                    * this.frequencyMap[key];
        return moment / this.data.length;
    }
    public getAsymetry(): number {
        this.asymetry = this.getCentaralEmpiricalMoment(3) / this.avgSqrDeviation;

        return this.asymetry;
    }
    public getExcess(): number {
        this.excess = this.getCentaralEmpiricalMoment(4) / Math.pow(this.avgSqrDeviation, 4) - 3;

        return this.excess;
    }
    public getFrequencyPolygonData(): Object[] {
        let data = [];
        for (let i = 0; i < this.amountOfVariables; i++)
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(this.frequencyMap[this.uniqueVariants[i]], 3)
            });
        return data;
    }
    public getComulativeCurveData(): Object[] {
        let data = [];
        let funcVal = 0;
        for (let i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.frequencyMap[this.uniqueVariants[i]];
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(funcVal, 3)
            });
        }
        return data;
    }

    public getEmpiricalDistributionData(): Object[] {
        let data = [];
        let funcVal = 0;
        for (let i = 0; i < this.amountOfVariables; i++) {
            data.push({
                x: this.uniqueVariants[i],
                y: Utils.round(funcVal, 3)
            });
            funcVal += this.frequencyMap[this.uniqueVariants[i]] / this.amount;
        }
        return data;
    }
}

class ChartHandler {
    public frequencyPolygonChart: Object;
    public comulativeCurveChart: Object;
    public empiricalDistibutionChart: Object;

    public updateFrequencyPolygon(xMin: number, xMax: number, data: Object[]) {
        let chart = document.getElementById('frequencyPolygon') as HTMLCanvasElement;
        // @ts-ignore
        this.frequencyPolygonChart = new Chart(chart.getContext('2d'),
            {
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
    }

    public updateComulativeCurve(xMin: number, xMax: number, data: Object[]) {
        let chart = document.getElementById('comulativeCurve') as HTMLCanvasElement;
        // @ts-ignore
        this.comulativeCurveChart = new Chart(chart.getContext('2d'),
            {
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
                                labelString: 'nᵢ',
                                fontSize: 16,
                                fontStyle: 'bold'
                            }
                        }]
                    },
                }
            });
    }

    public updateEmpiricalDistribution(xMin: number, xMax: number, data: Object[]) {
        let chart = document.getElementById('empiricalDistibution') as HTMLCanvasElement;
        let datasets = [{
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
        for (let i = 1; i < data.length; i++) {
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
        this.empiricalDistibutionChart = new Chart(chart.getContext('2d'),
            {
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
    }
}