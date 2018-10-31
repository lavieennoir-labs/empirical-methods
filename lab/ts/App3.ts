class Utils3 {
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
class Interval {
    public start: number;
    public end: number;
    public startInclusice: boolean = true;
    public endInclusive: boolean;

    public constructor(_start:number, _end:number, _endInclusive:boolean = false){
        this.start = _start;
        this.end = _end;
        this.endInclusive = _endInclusive;
    }
    
    public toString = () : string => {
        return (this.startInclusice ? "[" : "(") + Utils3.round(this.start,3)+ ", " +
         Utils3.round(this.end,3) + (this.endInclusive ? "]" : ")");
    }
}

class App3 {
    //public data: number[] = [-4.4, -4.2, -3.6, -2.4, -2, -0.6, -0.6, -0.2, -0.2, 0.4, 0.6, 1.4, 2.4, 2.6, 2.6];
    public data: number[] = [-5, -5, -5, -5, -5, -4.6, -4.6, -4.6, -4.4, -4.4, -4.4, -4.4, -4.2, -4.2, -4.2, -4.2, -4.2, -4, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.6, -3.4, -3.4, -3.4, -3.4, -3.2, -3.2, -3.2, -3.2, -3.2, -3.2, -3, -2.6, -2.6, -2.6, -2.4, -2.4, -2.4, -2.4, -2.2, -2, -2.2, -2.2, -2.2, -2, -1.6, -1.6, -1.6, -1.4, -1.4, -1.4, -1.2, -1.2, -1.2, -1.2, -1.2, -1.2, -1, -0.6, -0.6, -0.6, -0.4, -0.4, -0.4, -0.4, -0.2, -0.2, -0.2, -0.2, -0.2, 0, 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 1, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.4, 1.4, 1.4, 1.6, 1.6, 1.6, 2, 2.2, 2.2, 2.2, 2.2, 2.2, 2.4, 2.4, 2.4, 2.4, 2.6, 2.6, 2.6, 3, 3.2, 3.2, 3.2, 3.2, 3.2, 3.4, 3.4, 3.4, 3.4, 3.6, 3.6, 3.6, 4, 4.2, 4.2, 4.2, 4.2, 4.2, 4.4, 4.4, 4.4, 4.4, 4.6, 4.6, 4.6, 4.6, 4.6, 5, 5, 5, 5]

    public dataRow: JQuery<HTMLElement>;

    public propCalculator: PropCalculator3;

    public precition: number = 2;
    public momentCount: number = 3;

    constructor(dataRowId: string) {
        this.dataRow = $('#' + dataRowId);
        if (!this.dataRow)
            console.error('Invalid dataRowId: ' + dataRowId);
        this.propCalculator = new PropCalculator3(this.data, 0.05);

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
    public writeMap(keyRowId: string, valRowId: string, keys: any[], values: number[]): void {
        let keyRow = $('#' + keyRowId);
        let valRow = $('#' + valRowId);
        keyRow.children('td').remove();
        valRow.children('td').remove();

        for (let i = 0; i < keys.length; i++) {
            keyRow.append(this.createNewCellContent(keys[i]));
            valRow.append(this.createNewCellContent(values[i]));
        }
    }
    public updateResult(): void {
        this.propCalculator = new PropCalculator3(this.data,0.05);

        $('#intervalForKnownDispersion1')[0].innerText =
            this.propCalculator.intervalForKnownDispersion.toString();
        $('#intervalForUnknownDispersion1')[0].innerText =
            this.propCalculator.intervalForUnknownDispersion.toString();
        $('#intervalForSqrDeviation1')[0].innerText =
            this.propCalculator.intervalForSqrDeviation.toString();
            
        this.propCalculator = new PropCalculator3(this.data,0.01);

        $('#intervalForKnownDispersion2')[0].innerText =
            this.propCalculator.intervalForKnownDispersion.toString();
        $('#intervalForUnknownDispersion2')[0].innerText =
            this.propCalculator.intervalForUnknownDispersion.toString();
        $('#intervalForSqrDeviation2')[0].innerText =
            this.propCalculator.intervalForSqrDeviation.toString();
            
        this.propCalculator = new PropCalculator3(this.data,0.001);

        $('#intervalForKnownDispersion3')[0].innerText =
            this.propCalculator.intervalForKnownDispersion.toString();
        $('#intervalForUnknownDispersion3')[0].innerText =
            this.propCalculator.intervalForUnknownDispersion.toString();
        $('#intervalForSqrDeviation3')[0].innerText =
            this.propCalculator.intervalForSqrDeviation.toString();
    }

    protected createNewElementContent(value: number): string {
        return "<td><input class='form-control' type='number' value='" + value + "'/></td>";
    }
    protected createNewCellContent(value: any): string {
        return "<td>" + value + "</td>";
    }
}

class PropCalculator3 {
    public data: number[];
    public frequencyMap: Object;
    public relativeFrequencyMap: Object;
    public amountOfVariables: number;
    public amount: number;
    public avgEmpirical: number;
    public moda: number[];
    public maxEntries: number;
    public mediana: number;
    public width: number;
    public dispersion: number;
    public avgSqrDeviation: number;
    public variation: number;
    public asymetry: number;
    public excess: number;
    public uniqueVariants: string[];
    public frequencyValues: number[];
    public relativeFrequencyValues: number[];
    public discreteValues: number[];
    public intervalSize: number;
    public intervalCount: number;
    public dataMin:number;
    public dataMax:number;
    public dataIntervals:Interval[];
    public intervalForKnownDispersion:Interval;
    public intervalForUnknownDispersion:Interval;
    public intervalForSqrDeviation:Interval;
    public LaplaceMap: object = {};
    public StudentMap: object = {};
    public PirsonMap: object = {};

    constructor(data: number[], a:number) {
        this.data = data
        this.amount = data.length;
        this.LaplaceMap[0.05] = 1.96;//Ф(t) = 0.95/2 = 0.475
        this.LaplaceMap[0.01] = 2.58;//Ф(t) = 0.99/2 = 0.495
        this.LaplaceMap[0.001] = 3.4;//Ф(t) = 0.999/2 = 0.4995
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

    public getIntervalSize(): Object {
        this.dataMin = Math.min.apply(null, this.data);
        this.dataMax = Math.max.apply(null, this.data);
        this.intervalCount = 1 + 3.322 * Utils3.log10(this.data.length);
        this.intervalSize = 
            (this.dataMax - this.dataMin) / this.intervalCount;
        return this.intervalSize;
    }
    public getFrequencyMap(): Object {
        this.frequencyMap = {};
        this.uniqueVariants = [];
        this.amountOfVariables = 0;
        this.dataIntervals = [];
        this.discreteValues = [];
        let intervalStart = this.dataMin;
        for (let i = 0; i < this.intervalCount - 1; i++){
            this.dataIntervals[i] = new Interval(intervalStart, intervalStart+this.intervalSize);
            this.discreteValues.push((this.dataIntervals[i].end - this.dataIntervals[i].start) / 2 + this.dataIntervals[i].start);
            intervalStart += this.intervalSize;
        }
        this.dataIntervals[ Math.floor(this.intervalCount)] = new Interval(intervalStart, this.dataMax, true);
        this.discreteValues.push((this.dataIntervals[ Math.floor(this.intervalCount)].end - this.dataIntervals[ Math.floor(this.intervalCount)].start) / 2 + this.dataIntervals[ Math.floor(this.intervalCount)].start);

        let currentIntervalIdx = 0;
        for (let i = 0; i < this.data.length; i++) {
            while(this.data[i] >= this.dataIntervals[currentIntervalIdx].end && currentIntervalIdx < this.dataIntervals.length - 1 )
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
    }
    public getRelativeFrequencyMap(): Object {
        this.relativeFrequencyMap = {};
        this.frequencyValues = [];
        this.relativeFrequencyValues = [];
        for (let i = 0; i < this.uniqueVariants.length; i++) {
            this.relativeFrequencyMap[this.uniqueVariants[i]] = this.frequencyMap[this.uniqueVariants[i]] / this.amount;
            this.frequencyValues.push(this.frequencyMap[this.uniqueVariants[i]]);
            this.relativeFrequencyValues.push(this.relativeFrequencyMap[this.uniqueVariants[i]]);
        }
        
        return this.relativeFrequencyMap;
    }

    public getAvgEmpiricalValue(): number {
        this.avgEmpirical = 0;
        for (let i = 0; i < this.amountOfVariables; i++)
            this.avgEmpirical += this.relativeFrequencyValues[i] * this.discreteValues[i];

        return this.avgEmpirical;
    }

    public getModa(): number[] {
        this.maxEntries = -1;
        let currentValue = null;
        let currentEntries = 0;
        for(let i = 0; i < this.data.length; i++){
            if(this.data[i] != currentValue){
                currentValue = this.data[i];
                currentEntries = 1;
            }
            else{
                currentEntries++;
            }
            if (currentEntries > this.maxEntries)
                this.maxEntries = currentEntries;
        }

        this.moda = [];
        currentValue = null;
        currentEntries = 0;
        for(let i = 0; i < this.data.length; i++){
            if(this.data[i] != currentValue){
                currentValue = this.data[i];
                currentEntries = 1;
            }
            else{
                currentEntries++;
            }
            if (currentEntries == this.maxEntries)
                this.moda.push(currentValue);
        }

        let prevModaIntervals: Interval[] = [];
        let modaIntervals: Interval[] = [];
        let postModaIntervals: Interval[] = [];
        for(let j = 0; j < this.moda.length; j++)
            for(let i = 0; i < this.dataIntervals.length; i++)
                if(this.moda[j] >= this.dataIntervals[i].start && this.moda[j] < this.dataIntervals[i].end){
                    prevModaIntervals.push(this.dataIntervals[i-1]);
                    modaIntervals.push(this.dataIntervals[i]);
                    postModaIntervals.push(this.dataIntervals[i+1]);
                    continue;
                }
        let intevalModa: number[] = [];
        for(let i = 0; i < modaIntervals.length; i++){
            intevalModa.push(
                modaIntervals[i].start + this.intervalSize *
                (this.frequencyMap[modaIntervals[i].toString()] - this.frequencyMap[prevModaIntervals[i].toString()]) /
                (this.frequencyMap[modaIntervals[i].toString()] - this.frequencyMap[prevModaIntervals[i].toString()] - this.frequencyMap[postModaIntervals[i].toString()])
            )
        }
        this.moda = intevalModa;
        return this.moda;
    }

    public getMediana(): number {
        let midPoint = this.data.length / 2;
        if (Math.floor(midPoint) == midPoint)
            this.mediana = this.data[midPoint];
        else
            this.mediana = (this.data[Math.floor(midPoint)] + this.data[Math.round(midPoint)]) / 2;


        let medianIntevalIdx = -1;
        let accumulatedFreq = 0;
        for(let i = 0; i < this.dataIntervals.length; i++)
            if(this.mediana >= this.dataIntervals[i].start && this.mediana < this.dataIntervals[i].end){
                medianIntevalIdx = i;
                break;
            }
            else {
                accumulatedFreq += this.frequencyMap[this.dataIntervals[i].toString()];
            }
        
        this.mediana = this.dataIntervals[medianIntevalIdx].start +
            (this.intervalSize / this.frequencyMap[this.dataIntervals[medianIntevalIdx].toString()]) *
            (this.amount /2 - accumulatedFreq);
        return this.mediana;
    }
    public getWidth(): number {
        this.width = this.data[this.data.length - 1] - this.data[0];
        return this.width;
    }
    public getDispersion(): number {
        this.dispersion = 0;
        //for(let i = 0; i < this.dataIntervals.length; i++)
        //    this.dispersion += this.relativeFrequencyMap[this.dataIntervals[i].toString()] *
        //        this.discreteValues[i]
        //this.dispersion /= this.data.length;
        //this.dispersion -= Utils3.sqr(this.avgEmpirical);
        //using momments returns the same value
        this.dispersion = this.getStartEmpiricalMoment(2) - Utils3.sqr(this.getStartEmpiricalMoment(1));
        return this.dispersion;
    }
    public getDeviation(): number {
        this.avgSqrDeviation = Math.sqrt(this.dispersion);
        return this.avgSqrDeviation;
    }
    public getVariation(): number {
        this.variation = this.avgSqrDeviation / this.avgEmpirical * 100;
        return this.variation;
    }
    public getStartEmpiricalMoment(exponent: number): number {
        let moment = 0;
        for(let i = 0; i < this.dataIntervals.length; i++)
            moment += Math.pow(this.discreteValues[i], exponent)
                * this.frequencyValues[i];
        return moment / this.data.length;
    }
    public getCentaralEmpiricalMoment(exponent: number): number {
        let moment = 0;
        for(let i = 0; i < this.dataIntervals.length; i++)
            moment += Math.pow(this.discreteValues[i] - this.avgEmpirical, exponent)
                * this.frequencyValues[i];
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
    public getFrequencyHistogramData(): number[] {
        let data = [];
        for (let i = 0; i < this.dataIntervals.length; i++)
            data.push(
                Utils3.round(this.frequencyMap[this.dataIntervals[i].toString()] / this.intervalSize, 2)
            );
        return data;
    }
    public getFrequencyHistogramRelativeData(): number[] {
        let data = [];
        for (let i = 0; i < this.dataIntervals.length; i++)
            data.push(
                Utils3.round(this.relativeFrequencyMap[this.dataIntervals[i].toString()] / this.intervalSize, 2)
            );
        return data;
    }
    public getComulativeCurveData(): Object[] {
        let data = [];
        let funcVal = 0;
        for (let i = 0; i < this.dataIntervals.length; i++) {
            funcVal += this.frequencyMap[this.dataIntervals[i].toString()];
            data.push({
                x: i,
                y: Utils3.round(funcVal, 2)
            });
        }
        return data;
    }
    public getComulativeCurveRelativeData(): Object[] {
        let data = [];
        let funcVal = 0;
        for (let i = 0; i < this.amountOfVariables; i++) {
            funcVal += this.relativeFrequencyMap[this.dataIntervals[i].toString()];
            data.push({
                x: i,
                y: Utils3.round(funcVal, 2)
            });
        }
        return data;
    }

    public getEmpiricalDistributionData(): Object[] {
        let data = [];
        let funcVal = 0;
        for (let i = 0; i < this.dataIntervals.length; i++) {
            data.push({
                x: Utils3.round(this.discreteValues[i], 2),
                y: Utils3.round(funcVal, 2)
            });
            funcVal += this.frequencyValues[i] / this.amount;
        }
        return data;
    }

    public getIntervalForKnownDispersion(a:number){
        let start: number = this.avgEmpirical - this.avgSqrDeviation / Math.sqrt(this.amount) * this.LaplaceMap[a];
        let end: number = this.avgEmpirical + this.avgSqrDeviation / Math.sqrt(this.amount) * this.LaplaceMap[a];
        this.intervalForKnownDispersion = new Interval(start, end, true);
        return this.intervalForKnownDispersion;
    }

    public getIntervalForUnknownDispersion(a:number){
        let start: number = this.avgEmpirical - this.avgSqrDeviation / Math.sqrt(this.amount) * this.StudentMap[a];
        let end: number = this.avgEmpirical + this.avgSqrDeviation / Math.sqrt(this.amount) * this.StudentMap[a];
        this.intervalForUnknownDispersion = new Interval(start, end, true);
        return this.intervalForUnknownDispersion;
    }

    public getIntervalForSqrDeviation(a:number){
        let modifiedAvgSqlDeviation = Math.sqrt(this.dispersion * this.amount / (this.amount - 1));
        let start: number = modifiedAvgSqlDeviation * (1 - this.PirsonMap[a]);
        let end: number = modifiedAvgSqlDeviation * (1 + this.PirsonMap[a]);
        this.intervalForSqrDeviation = new Interval(start, end, true);
        return this.intervalForSqrDeviation;
    }
}
