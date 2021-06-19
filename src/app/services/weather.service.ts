import { EventEmitter, Injectable } from '@angular/core';
import { CurrentWeather } from '../models/current-weather';
import { HourlyWeather } from '../models/hourly-weather';
import { DailyWeather } from '../models/daily-weather';
import { WeatherAPIService } from './weather-api.service';
import { IconProviderService } from './icon-provider.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends WeatherAPIService {

  protected _currentWeather: CurrentWeather | undefined;
  protected _hourlyWeatherForecast: HourlyWeather[] = [];
  protected _dailyWeatherForecast: DailyWeather[] = [];
  protected _units!: string;
  protected _forecastTimeRange!: string;
  protected _weatherProperty!: string;
  weatherUpdated: EventEmitter<string> = new EventEmitter();

  clear(iconProviderService: IconProviderService) {
    this._currentWeather = new CurrentWeather(null, iconProviderService);
    this._hourlyWeatherForecast = [];
    for (let i = 0; i < 48; i++) {
      this._hourlyWeatherForecast[i] = new HourlyWeather(null, iconProviderService);
    }
    this._dailyWeatherForecast = [];
    for (let i = 0; i < 8; i++) {
      this._dailyWeatherForecast[i] = new DailyWeather(null, iconProviderService);
    }
  }
  
  async updateWeather(lat: number, lon: number, units: string, iconProviderService: IconProviderService) {

    this.clear(iconProviderService);

    let result: any = await this.httpClient.get(
      `${this._weatherInfoHost}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${this._APIKey}&units=${units}`,
        { observe: 'response' }
    ).toPromise();

    console.log(result);

    if (result.status != 200)
      return result.status;

    this._currentWeather = new CurrentWeather(result.body.current, iconProviderService);

    this._hourlyWeatherForecast = [];
    for (let i = 0; i < result.body.hourly.length; i++) {
      this._hourlyWeatherForecast[i] = new HourlyWeather(result.body.hourly[i], iconProviderService);
    }

    this._dailyWeatherForecast = [];
    for (let i = 0; i < result.body.daily.length; i++) {
      this._dailyWeatherForecast[i] = new DailyWeather(result.body.daily[i], iconProviderService);
    }

    this.weatherUpdated.emit();

    return result.status;
  }

  getMapBase() {
    return `${this._mapHost}/light_all/{z}/{x}/{y}.png`;
  }

  getMapWeatherLayer(weatherMapLayers: string) {
    return `${this._weatherMapHost}/map/${weatherMapLayers}/{z}/{x}/{y}.png?appid=${this._APIKey}`;
  }

  get currentWeather() {
    return this._currentWeather;
  }

  get hourlyntWeatherForecast() {
    return this._hourlyWeatherForecast;
  }

  get dailyWeatherForecast() {
    return this._dailyWeatherForecast;
  }

  get units() {
    return this._units;
  }

  get forecastTimeRange() {
    return this._forecastTimeRange;
  }

  get weatherProperty() {
    return this._weatherProperty;
  }

  set units(value: string) {
    this._units = value;
    this.weatherUpdated.emit();
  }

  set forecastTimeRange(value: string) {
    this._forecastTimeRange = value;
    this.weatherUpdated.emit();
  }

  set weatherProperty(value: string) {
    this._weatherProperty = value;
    this.weatherUpdated.emit();
  }
}
