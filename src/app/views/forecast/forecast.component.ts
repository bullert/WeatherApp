import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { LineChartData } from '../../models/line-chart-data';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  charts!: any;
  dataModel!: LineChartData;

  @ViewChild(LineChartComponent) lineChartComponent!: LineChartComponent;

  constructor(protected _weatherService: WeatherService) {
    this.charts = {
      'daily': {},
      'hourly': {}
    };
  }

  ngOnInit(): void {
    this._weatherService.weatherUpdated.subscribe(
      () => {
        this.updateChart(this._weatherService.forecastTimeRange, this._weatherService.weatherProperty);
        this.lineChartComponent.initialize(this.dataModel);
      }
    );
  }

  ngAfterViewInit() {
    this.updateChart(this._weatherService.forecastTimeRange, this._weatherService.weatherProperty);
    this.lineChartComponent.initialize(this.dataModel);
  }

  updateChart(forecastTimeRange: string, weatherProperty: string) {
    let forecast, mainLabel = '', data = [], color = '';

    if (!forecastTimeRange || !weatherProperty)
      return;

    if (forecastTimeRange == 'daily') {
      forecast = this._weatherService.dailyWeatherForecast;
    }
    else if (forecastTimeRange == 'hourly') {
      forecast = this._weatherService.hourlyntWeatherForecast;
    }

    if (!forecast)
      return;

    for (let i = 0; i < forecast.length; i++) {

      let value = 0;

      if (weatherProperty == 'temp_new') {
        value = forecast[i].temp;
        mainLabel = 'C°';
        color = '#FFB800';
      }
      else if (weatherProperty == 'wind_new') {
        value = forecast[i].wind.speed;
        mainLabel = 'm/s';
        color = '#9A39D5';
      }
      else if (weatherProperty == 'pressure_new') {
        value = forecast[i].pressure;
        mainLabel = 'hPa';
        color = '#FF3C00';
      }
      else if (weatherProperty == 'clouds_new') {
        value = forecast[i].clouds;
        mainLabel = '%';
        color = '#8ceaed';
      }
      else if (weatherProperty == 'precipitation_new') {
        value = forecast[i].POP;
        mainLabel = '%';
        color = '#2885C7';
      }

      let label = '', secLabel = '';

      if (forecastTimeRange == 'daily') {
        label = forecast[i].dateShort;
      }
      else if (forecastTimeRange == 'hourly') {
        label = forecast[i].time;
        if (forecast[i].time == '00:00' || i == 0) {
          secLabel = forecast[i].dateShort;
        }
      }

      data[i] = {
        'value': value,
        'label': label,
        'secLabel': secLabel
      }
    }

    this.charts[forecastTimeRange][weatherProperty] = new LineChartData(data, mainLabel, color);
    this.dataModel = this.charts[forecastTimeRange][weatherProperty];
  }
}
