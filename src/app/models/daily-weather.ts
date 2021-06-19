import { IconProviderService } from '../services/icon-provider.service';
import { HourlyWeather } from './hourly-weather';
import { MoonPhase } from './moon-phase';

export class DailyWeather extends HourlyWeather {

  protected _sunrise: string = '';
  protected _sunset: string = '';
  protected _moonrise: string = '';
  protected _moonset: string = '';
  protected _nightTemp: number = 0;
  protected _nightFeelsLike: number = 0;
  protected _moonPhase!: MoonPhase;

  constructor(apiResponse: any, iconProviderService: IconProviderService) {

    super(apiResponse, iconProviderService);
    
    let ms = new Date(this._dt * 1000),
      sunrise = apiResponse?.sunrise || 0,
      sunset = apiResponse?.sunset || 0,
      moonrise = apiResponse?.moonrise || 0,
      moonset = apiResponse?.moonset || 0;

    this._sunrise = new Date(sunrise * 1000)
      .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    this._sunset = new Date(sunset * 1000)
      .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    this._moonrise = new Date(moonrise * 1000)
      .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    this._moonset = new Date(moonset * 1000)
      .toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    this._temp = Math.round(apiResponse?.temp.day || 0);
    this._nightTemp = Math.round(apiResponse?.temp.night || 0);
    this._feelsLike = Math.round(apiResponse?.feels_like.day || 0);
    this._nightFeelsLike = Math.round(apiResponse?.feels_like.night || 0);
    this._moonPhase = new MoonPhase(apiResponse?.moon_phase || 0, iconProviderService);
  }

  get sunrise() {
    return this._sunrise;
  }

  get sunset() {
    return this._sunset;
  }

  get moonrise() {
    return this._moonrise;
  }

  get moonset() {
    return this._moonset;
  }

  get nightTemp() {
    return this._nightTemp;
  }

  get nightFeelsLike() {
    return this._nightFeelsLike;
  }

  get moonPhase() {
    return this._moonPhase;
  }
}
