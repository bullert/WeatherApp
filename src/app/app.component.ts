import { Component } from '@angular/core';
import { AirPollutionService } from './services/air-pollution.service';
import { IconProviderService } from './services/icon-provider.service';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';

  constructor(
    private _weatherService: WeatherService,
    private _airPollutionService: AirPollutionService,
    private _iconProviderService: IconProviderService
  ) { }

  async ngOnInit() {
    this._weatherService.clear(this._iconProviderService);
    this._airPollutionService.clear();
  }
}
