import { IconProviderService } from "../services/icon-provider.service";

export class Wind {

  protected _directions: string[] = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'
  ];
  protected _speed!: number;
  protected _degree!: number;
  protected _direction!: string;

  constructor(speed: number, degree: number, iconProviderService: IconProviderService) {

    this._speed = Math.round(speed) || 0;
    this._degree = degree || 0;

    let len = this._directions.length,
      min = 360, index = 0;

    for (let i = 0; i < len; i++) {
      let r = i * (Math.PI * 2 / len),
        a = r * 180 / Math.PI,
        d = Math.abs(degree - a);
      if (d < min) {
        index = i;
        min = d;
      }
    }

    this._direction = this._directions[index];
  }

  get speed() {
    return this._speed;
  }

  get degree() {
    return this._degree;
  }

  get direction() {
    return this._direction;
  }
}
