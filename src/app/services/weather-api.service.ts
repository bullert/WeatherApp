import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class WeatherAPIService {

  //113403053c73ca7486f02eb11c41134a
  //6a0351bf73e2b15f6eb3c83b97924abe
  protected _weatherInfoHost: string = 'http://api.openweathermap.org';
  protected _weatherMapHost: string = 'http://tile.openweathermap.org';
  protected _mapHost: string = 'https://{s}.basemaps.cartocdn.com';
  protected _APIKey: string = '113403053c73ca7486f02eb11c41134a';
  
  constructor(protected httpClient: HttpClient) { }
}
