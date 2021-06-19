import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { WeatherService } from '../../services/weather.service';
import { Geolocation } from '../../models/geolocation';
import { CurrentWeather } from '../../models/current-weather';
import { DailyWeather } from '../../models/daily-weather';
import { HourlyWeather } from '../../models/hourly-weather';
import { IconProviderService } from '../../services/icon-provider.service';
import { AirPollutionService } from '../../services/air-pollution.service';
import { AirPollution } from '../../models/air-pollution';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherComponent implements OnInit {

  geolocation!: Geolocation | undefined;
  currentWeather!: CurrentWeather | undefined;
  todaysWeather!: DailyWeather | undefined;
  dailyWeatherForecast!: DailyWeather[] | undefined;
  hourlyWeatherForecast!: HourlyWeather[] | undefined;
  airPollution!: AirPollution | undefined;
  units!: string | undefined;
  forecastTimeRange!: string | undefined;
  weatherProperty!: string | undefined;

  constructor(
    private _geolocationService: GeolocationService,
    private _weatherService: WeatherService,
    private _iconProviderService: IconProviderService,
    private _airPollutionService: AirPollutionService,
    private cdRef: ChangeDetectorRef
  ) {
    this.currentWeather = new CurrentWeather(null, this._iconProviderService);
    this.todaysWeather = new DailyWeather(null, this._iconProviderService);
    this.airPollution = new AirPollution(null);
  }

  async ngOnInit() {
    this._weatherService.weatherUpdated.subscribe(
      () => {
        this.geolocation = this._geolocationService.geolocation;
        this.currentWeather = this._weatherService.currentWeather;
        this.hourlyWeatherForecast = this._weatherService.hourlyntWeatherForecast;
        this.dailyWeatherForecast = this._weatherService.dailyWeatherForecast;
        this.todaysWeather = this.dailyWeatherForecast[0];
        this.units = this._weatherService.units;
        this.forecastTimeRange = this._weatherService.forecastTimeRange;
        this.weatherProperty = this._weatherService.weatherProperty;
      }
    );
    this._airPollutionService.infoUpdated.subscribe(
      () => {
        this.airPollution = this._airPollutionService.airPollution;
      }
    );
  }

  ngAfterViewInit() {
    this.geolocation = this._geolocationService.geolocation;
    this.currentWeather = this._weatherService.currentWeather;
    this.hourlyWeatherForecast = this._weatherService.hourlyntWeatherForecast;
    this.dailyWeatherForecast = this._weatherService.dailyWeatherForecast;
    this.todaysWeather = this.dailyWeatherForecast[0];
    this.units = this._weatherService.units;
    this.forecastTimeRange = this._weatherService.forecastTimeRange;
    this.weatherProperty = this._weatherService.weatherProperty;
    this.airPollution = this._airPollutionService.airPollution;
    this.cdRef.detectChanges();
  }

}
