import { Injectable } from '@angular/core';
import { WeatherAPIService } from './weather-api.service';
import { Geolocation } from '../models/geolocation'

@Injectable({
  providedIn: 'root'
})
export class GeolocationService extends WeatherAPIService {

  protected _geolocation!: Geolocation | undefined;

  async updateGeolocation(location: string) {

    let result: any = await this.httpClient.get(
      `${this._weatherInfoHost}/geo/1.0/direct?q=${location}&appid=${this._APIKey}`,
      { observe: 'response' }
    ).toPromise();

    if (result.status != 200 || result.body.length == 0) {
      this._geolocation = undefined;
      return result.status;
    }

    this._geolocation = new Geolocation(result.body[0]);
    console.log(this._geolocation);

    return result.status;
  }

  get geolocation() {
    return this._geolocation;
  }
}
