
export class LineChartData {

  protected _label!: string;
  protected _values!: any[];
  protected _step!: number;
  protected _offset!: number;
  protected _min!: number;
  protected _max!: number;
  protected _style!: string;

  constructor(values: any[], label: string = '', style = '#000', step: number = 10, offset: number = 1, min: any = 'dynamic', max: any = 'dynamic') {
    this._label = label;
    this._values = values;
    this._style = style;
    this._step = step;
    this._offset = offset;

    if (min == 'dynamic') {
      this._min = this.getMinValue(this._values) - this._step;
    }

    if (max == 'dynamic') {
      this._max = this.getMaxValue(this._values) + this._step;
    }
  }

  get label() {
    return this._label;
  }

  get values() {
    return this._values;
  }

  get step() {
    return this._step;
  }

  get offset() {
    return this._offset;
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  get style() {
    return this._style;
  }

  getMinValue(values: any[]) {
    let min = values[0].value;
    for (let i = 0; i < values.length; i++) {
      let v = values[i].value;
      if (v < min)
        min = v;
    }
    return min;
  }

  getMaxValue(values: any[]) {
    let max = values[0].value;
    for (let i = 0; i < values.length; i++) {
      let v = values[i].value;
      if (v > max)
        max = v;
    }
    return max;
  }
}
