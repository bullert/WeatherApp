import { IconProviderService } from "../services/icon-provider.service";

export class MoonPhase {

  protected _value!: number;
  protected _name!: string;
  protected _icon!: string;

  constructor(value: number = 0, iconProviderService: IconProviderService) {

    this._value = value;

    if (value > 0 && value < .25) {
      this._name = 'Waxing Crescent';
    }
    else if (value == .25) {
      this._name = 'First Quarter';
    }
    else if (value > .25 && value < .5) {
      this._name = 'Waxing Gibbous';
    }
    else if (value == .5) {
      this._name = 'Full';
    }
    else if (value > .5 && value < .75) {
      this._name = 'Waning Gibbous';
    }
    else if (value == .75) {
      this._name = 'Last Quarter';
    }
    else if (value > .75 && value < 1) {
      this._name = 'Waning Crescent';
    }
    else {
      this._name = 'New';
    }

    let icon = `moon-${this._name.replace(' ', '-').toLowerCase()}`;
    this._icon = iconProviderService.getWeatherIconPath(icon);
  }

  get value() {
    return this._value;
  }

  get name() {
    return this._name;
  }

  get icon() {
    return this._icon;
  }
}
