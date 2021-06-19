import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconProviderService {

  weatherIcons = [
    // thunderstorm
    { id: 200, dayTime: 'd', name: 'thunderstorms-day-rain' },
    { id: 201, dayTime: 'd', name: 'thunderstorms-day-rain' },
    { id: 202, dayTime: 'd', name: 'thunderstorms-day-rain' },
    { id: 210, dayTime: 'd', name: 'thunderstorms-day' },
    { id: 211, dayTime: 'd', name: 'thunderstorms-day' },
    { id: 212, dayTime: 'd', name: 'thunderstorms-day' },
    { id: 221, dayTime: 'd', name: 'thunderstorms-day' },
    { id: 230, dayTime: 'd', name: 'thunderstorms-day-rain' },
    { id: 231, dayTime: 'd', name: 'thunderstorms-day-rain' },
    { id: 232, dayTime: 'd', name: 'thunderstorms-day-rain' },
    { id: 200, dayTime: 'n', name: 'thunderstorms-night-rain' },
    { id: 201, dayTime: 'n', name: 'thunderstorms-night-rain' },
    { id: 202, dayTime: 'n', name: 'thunderstorms-night-rain' },
    { id: 210, dayTime: 'n', name: 'thunderstorms-night' },
    { id: 211, dayTime: 'n', name: 'thunderstorms-night' },
    { id: 212, dayTime: 'n', name: 'thunderstorms-night' },
    { id: 221, dayTime: 'n', name: 'thunderstorms-night' },
    { id: 230, dayTime: 'n', name: 'thunderstorms-night-rain' },
    { id: 231, dayTime: 'n', name: 'thunderstorms-night-rain' },
    { id: 232, dayTime: 'n', name: 'thunderstorms-night-rain' },
    // drizzle
    { id: 300, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 301, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 302, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 310, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 311, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 312, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 313, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 314, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 321, dayTime: 'd', name: 'partly-cloudy-day-drizzle' },
    { id: 300, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 301, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 302, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 310, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 311, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 312, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 313, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 314, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    { id: 321, dayTime: 'n', name: 'partly-cloudy-night-drizzle' },
    // rain
    { id: 500, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 501, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 502, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 503, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 504, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 511, dayTime: 'd', name: 'partly-cloudy-day-hail' },
    { id: 520, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 521, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 522, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 531, dayTime: 'd', name: 'partly-cloudy-day-rain' },
    { id: 500, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 501, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 502, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 503, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 504, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 511, dayTime: 'n', name: 'partly-cloudy-night-hail' },
    { id: 520, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 521, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 522, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    { id: 531, dayTime: 'n', name: 'partly-cloudy-night-rain' },
    // snow
    { id: 600, dayTime: 'd', name: 'partly-cloudy-day-snow' },
    { id: 601, dayTime: 'd', name: 'partly-cloudy-day-snow' },
    { id: 602, dayTime: 'd', name: 'partly-cloudy-day-snow' },
    { id: 611, dayTime: 'd', name: 'partly-cloudy-day-sleet' },
    { id: 612, dayTime: 'd', name: 'partly-cloudy-day-sleet' },
    { id: 613, dayTime: 'd', name: 'partly-cloudy-day-sleet' },
    { id: 615, dayTime: 'd', name: 'partly-cloudy-day-sleet' },
    { id: 616, dayTime: 'd', name: 'partly-cloudy-day-sleet' },
    { id: 620, dayTime: 'd', name: 'partly-cloudy-day-snow' },
    { id: 621, dayTime: 'd', name: 'partly-cloudy-day-snow' },
    { id: 622, dayTime: 'd', name: 'partly-cloudy-day-snow' },
    { id: 600, dayTime: 'n', name: 'partly-cloudy-night-snow' },
    { id: 601, dayTime: 'n', name: 'partly-cloudy-night-snow' },
    { id: 602, dayTime: 'n', name: 'partly-cloudy-night-snow' },
    { id: 611, dayTime: 'n', name: 'partly-cloudy-night-sleet' },
    { id: 612, dayTime: 'n', name: 'partly-cloudy-night-sleet' },
    { id: 613, dayTime: 'n', name: 'partly-cloudy-night-sleet' },
    { id: 615, dayTime: 'n', name: 'partly-cloudy-night-sleet' },
    { id: 616, dayTime: 'n', name: 'partly-cloudy-night-sleet' },
    { id: 620, dayTime: 'n', name: 'partly-cloudy-night-snow' },
    { id: 621, dayTime: 'n', name: 'partly-cloudy-night-snow' },
    { id: 622, dayTime: 'n', name: 'partly-cloudy-night-snow' },
    // atmosphere
    { id: 701, dayTime: 'd', name: 'mist' },
    { id: 711, dayTime: 'd', name: 'smoke' },
    { id: 721, dayTime: 'd', name: 'haze' },
    { id: 731, dayTime: 'd', name: 'dust-wind' },
    { id: 741, dayTime: 'd', name: 'fog' },
    { id: 751, dayTime: 'd', name: 'dust' },
    { id: 761, dayTime: 'd', name: 'dust' },
    { id: 762, dayTime: 'd', name: 'dust' },
    { id: 771, dayTime: 'd', name: 'tornado' },
    { id: 781, dayTime: 'd', name: 'hurricane' },
    { id: 701, dayTime: 'n', name: 'mist' },
    { id: 711, dayTime: 'n', name: 'smoke' },
    { id: 721, dayTime: 'n', name: 'haze' },
    { id: 731, dayTime: 'n', name: 'dust-wind' },
    { id: 741, dayTime: 'n', name: 'fog' },
    { id: 751, dayTime: 'n', name: 'dust' },
    { id: 761, dayTime: 'n', name: 'dust' },
    { id: 762, dayTime: 'n', name: 'dust-wind' },
    { id: 771, dayTime: 'n', name: 'tornado' },
    { id: 781, dayTime: 'n', name: 'hurricane' },
    // clear
    { id: 800, dayTime: 'd', name: 'clear-day' },
    { id: 800, dayTime: 'n', name: 'clear-night' },
    // clouds
    { id: 801, dayTime: 'd', name: 'partly-cloudy-day' },
    { id: 802, dayTime: 'd', name: 'partly-cloudy-day' },
    { id: 803, dayTime: 'd', name: 'overcast-day' },
    { id: 804, dayTime: 'd', name: 'overcast-day' },
    { id: 801, dayTime: 'n', name: 'partly-cloudy-night' },
    { id: 802, dayTime: 'n', name: 'partly-cloudy-night' },
    { id: 803, dayTime: 'n', name: 'overcast-night' },
    { id: 804, dayTime: 'n', name: 'overcast-night' }
  ];

  constructor() { }

  getWeatherIconPath(icon: string) {
    return `/assets/svg/weather-icons/${icon}.svg`;
  }

  getWeatherIcon(id: number, dayTime: string) {
    for (let x of this.weatherIcons) {
      if (x.id == id && x.dayTime == dayTime)
        return this.getWeatherIconPath(x.name);
    }
    return '';
  }
}
