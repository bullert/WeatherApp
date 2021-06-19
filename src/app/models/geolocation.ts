export class Geolocation {

  protected _lat: number = 0;
  protected _lon: number = 0;
  protected _name: string = '';
  protected _country: string = '';

  constructor(apiResponse: any) {
    this._lat = apiResponse.lat;
    this._lon = apiResponse.lon;
    this._name = apiResponse.name;
    this._country = apiResponse.country;
  }

  get lat() {
    return this._lat;
  }

  get lon() {
    return this._lon;
  }

  get name() {
    return this._name;
  }

  get country() {
    return this._country;
  }
}
