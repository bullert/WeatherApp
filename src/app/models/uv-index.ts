
export class UVIndex {

  protected _index: number;
  protected _class: string;

  constructor(index: number) {
    this._index = index;
    
    if (index < 3) {
      this._class = 'low';
    }
    else if (index < 6) {
      this._class = 'moderate';
    }
    else if (index < 8) {
      this._class = 'high';
    }
    else if (index < 11) {
      this._class = 'very-high';
    }
    else {
      this._class = 'extreme';
    }
  }

  get index() {
    return this._index;
  }

  get class() {
    return this._class;
  }
}
