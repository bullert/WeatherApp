import { IconProviderService } from "../services/icon-provider.service";
import { UVIndex } from "./uv-index";
import { Wind } from "./wind";

export class CurrentWeather {

  protected _dt: number = 0;
  protected _description: string = '';
  protected _time: string = '';
  protected _date: string = '';
  protected _dateShort: string = '';
  protected _weekday: string = '';
  protected _weatherIcon: string = '';
  protected _temp: number = 0;
  protected _feelsLike: number = 0;
  protected _uvi!: UVIndex;
  protected _pressure: number = 0;
  protected _humidity: number = 0;
  protected _clouds: number = 0;
  protected _wind!: Wind;

  constructor(apiResponse: any, iconProviderService: IconProviderService) {
    
    this._dt = apiResponse?.dt || 0;

    let ms = new Date(this._dt * 1000),
      weatherIconId = apiResponse?.weather[0].id || 800,
      dayTime = apiResponse?.weather[0].icon.slice(-1) || 'd';

    this._time = ms.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    this._date = ms.toLocaleString('default', { day: 'numeric', month: 'long' });
    this._dateShort = ms.toLocaleString('default', { day: 'numeric', month: 'short' });
    this._weekday = ms.toLocaleString("default", { weekday: "long" });
    this._description = apiResponse?.weather[0].main || 'Clear';
    this._temp = Math.round(apiResponse?.temp || 0);
    this._feelsLike = Math.round(apiResponse?.feels_like || 0);
    this._uvi = new UVIndex(Math.round(apiResponse?.uvi || 0));
    this._pressure = apiResponse?.pressure || 0;
    this._humidity = apiResponse?.humidity || 0;
    this._clouds = apiResponse?.clouds || 0;
    this._wind = new Wind(apiResponse?.wind_speed, apiResponse?.wind_deg, iconProviderService);
    this._weatherIcon = iconProviderService.getWeatherIcon(weatherIconId, dayTime);
  }

  get dt() {
    return this._time;
  }

  get time() {
    return this._time;
  }

  get date() {
    return this._date;
  }

  get dateShort() {
    return this._dateShort;
  }

  get weekday() {
    return this._weekday;
  }

  get description() {
    return this._description;
  }

  get temp() {
    return this._temp;
  }

  get feelsLike() {
    return this._feelsLike;
  }

  get UVIndex() {
    return this._uvi;
  }

  get pressure() {
    return this._pressure;
  }

  get humidity() {
    return this._humidity;
  }

  get clouds() {
    return this._clouds;
  }

  get wind() {
    return this._wind;
  }

  get weatherIcon() {
    return this._weatherIcon;
  }
}
