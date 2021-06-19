
export class WeatherMapScale {

  protected _label!: string;
  protected _unit!: string;
  protected _values!: number[];
  protected _styleClass!: string;

  constructor(label: string, unit: string, values: number[], styleClass: string) {
    this._label = label;
    this._unit = unit;
    this._values = values;
    this._styleClass = styleClass;
  }

  get label() {
    return this._label;
  }

  get unit() {
    return this._unit;
  }

  get values() {
    return this._values;
  }

  get styleClass() {
    return this._styleClass;
  }
}
