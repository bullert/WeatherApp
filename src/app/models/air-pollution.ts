export class AirPollution {

  protected _aqi: number = 0;
  protected _pollutants: any[] = [];

  constructor(apiResponse: any) {
    this._aqi = apiResponse?.list[0].main.aqi || 1;
    this._pollutants = [
      { tag: 'CO', value: apiResponse?.list[0].components.co || 0 },
      { tag: 'NH<sub>3</sub>', value: apiResponse?.list[0].components.nh3 || 0 },
      { tag: 'NO', value: apiResponse?.list[0].components.no || 0 },
      { tag: 'NO<sub>2</sub>', value: apiResponse?.list[0].components.no2 || 0 },
      { tag: 'O<sub>3</sub>', value: apiResponse?.list[0].components.o3 || 0 },
      { tag: 'SO<sub>2</sub>', value: apiResponse?.list[0].components.so2 || 0 },
      { tag: 'PM<sub>2.5</sub>', value: apiResponse?.list[0].components.pm2_5 || 0 },
      { tag: 'PM<sub>10</sub>', value: apiResponse?.list[0].components.pm10 || 0 }
    ];
  }

  get airQualityIndex() {
    return this._aqi;
  }

  get pollutants() {
    return this._pollutants;
  }
}
