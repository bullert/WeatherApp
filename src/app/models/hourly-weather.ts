import { IconProviderService } from '../services/icon-provider.service';
import { CurrentWeather } from './current-weather';

export class HourlyWeather extends CurrentWeather {

  protected _rain: number = 0;
  protected _snow: number = 0;
  protected _pop: number = 0;

  constructor(apiResponse: any, iconProviderService: IconProviderService) {
    super(apiResponse, iconProviderService);

    let pop = apiResponse?.pop || 0

    this._rain = apiResponse?.rain || 0;
    this._snow = apiResponse?.snow || 0;
    this._pop = Math.round(pop * 100);
  }

  get rain() {
    return this._rain;
  }

  get snow() {
    return this._snow;
  }

  get POP() {
    return this._pop;
  }
}
