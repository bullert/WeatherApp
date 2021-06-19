import { EventEmitter, Injectable } from '@angular/core';
import { AirPollution } from '../models/air-pollution';
import { WeatherAPIService } from './weather-api.service';

@Injectable({
  providedIn: 'root'
})
export class AirPollutionService extends WeatherAPIService {

  protected _airPollution: AirPollution | undefined;
  infoUpdated: EventEmitter<string> = new EventEmitter();

  clear() {
    this._airPollution = new AirPollution(null);
  }

  async updateAirPollution(lat: number, lon: number) {

    this._airPollution = new AirPollution(null);

    let result: any = await this.httpClient.get(
      `${this._weatherInfoHost}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this._APIKey}`,
      { observe: 'response' }
    ).toPromise();

    console.log(result);

    if (result.status == 200) {
      this._airPollution = new AirPollution(result.body);
    }

    this.infoUpdated.emit();

    return result.status;
  }

  get airPollution() {
    return this._airPollution;
  }
}
