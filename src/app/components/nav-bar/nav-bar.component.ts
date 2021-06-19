import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AirPollutionService } from '../../services/air-pollution.service';
import { GeolocationService } from '../../services/geolocation.service';
import { IconProviderService } from '../../services/icon-provider.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  location!: string;
  view!: string;
  units!: string;
  forecastTimeRange!: string;
  weatherProperty!: string;
  errorClass!: string;
  errorMsg!: string;
  hasError!: boolean;
  sidenavMenuClass: string = '';

  constructor(
    protected geolocationService: GeolocationService,
    protected weatherService: WeatherService,
    protected airPollutionService: AirPollutionService,
    protected iconProviderService: IconProviderService,
    protected router: Router,
    public routerLocation: Location
  ) { }

  ngOnInit(): void {
    this.location = 'Poznań';
    this.view = (this.routerLocation.path()).substring(1);
    this.units = 'metric';
    this.forecastTimeRange = 'daily';
    this.weatherProperty = 'temp_new';

    this.geolocationService.updateGeolocation(this.location);
    this.weatherService.units = this.units;
    this.weatherService.forecastTimeRange = this.forecastTimeRange;
    this.weatherService.weatherProperty = this.weatherProperty;
  }

  ngAfterViewInit() {
    
  }

  onClickForecastTimeRange() {
    this.weatherService.forecastTimeRange = this.forecastTimeRange;
  }

  onClickWeatherProperty() {
    this.weatherService.weatherProperty = this.weatherProperty;
  }

  async onClickUnits() {
    this.weatherService.units = this.units;

    let geolocation = this.geolocationService.geolocation;

    if (geolocation === undefined) {
      return;
    }

    let status = await this.weatherService.updateWeather(geolocation.lat, geolocation.lon, this.units, this.iconProviderService);

    if (status != 200) {
      console.error(`API error, status: ${status}.`);
      return;
    }

    status = await this.airPollutionService.updateAirPollution(geolocation.lat, geolocation.lon);

    if (status != 200) {
      console.error(`API error, status: ${status}.`);
      return;
    }
  }

  async updateWeather() {

    let status;

    if (!this.location) {
      this.errorClass = 'my-form-field-error';
      this.errorMsg = 'This field cannot be empty';
      this.hasError = true;
      return;
    }

    status = await this.geolocationService.updateGeolocation(this.location);

    if (status != 200) {
      console.error(`API error, status: ${status}.`);
      return;
    }

    let geolocation = this.geolocationService.geolocation;

    if (geolocation === undefined) {
      this.errorClass = 'my-form-field-error';
      this.errorMsg = 'Location not found';
      this.hasError = true;
      return;
    }

    this.errorClass = '';
    this.errorMsg = '';
    this.hasError = false;

    status = await this.weatherService.updateWeather(geolocation.lat, geolocation.lon, this.units, this.iconProviderService);

    if (status != 200) {
      console.error(`API error, status: ${status}.`);
      return;
    }

    status = await this.airPollutionService.updateAirPollution(geolocation.lat, geolocation.lon);

    if (status != 200) {
      console.error(`API error, status: ${status}.`);
      return;
    }
  }

  toggleSidenavMenu() {
    this.sidenavMenuClass = this.sidenavMenuClass == '' ? 'side-nav-expanded' : '';
  }

}
