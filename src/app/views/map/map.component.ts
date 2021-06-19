import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import * as L from 'leaflet';
import { GeolocationService } from '../../services/geolocation.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherMapScale } from '../../models/weather-map-scale';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  protected _map: any;
  protected readonly _minZoom: number = 3;
  protected readonly _maxZoom: number = 10;
  protected readonly _maxLat: number = 90;
  protected readonly _maxLon: number = 180 * 2;
  protected _isFullScreenModeOn = false;
  protected _mapLayer!: L.TileLayer;
  protected _mapScales!: Map<string, WeatherMapScale>;
  protected _mapScale!: WeatherMapScale | undefined;

  constructor(
    protected _geolocationService: GeolocationService,
    protected _weatherService: WeatherService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {


    this._weatherService.weatherUpdated.subscribe(
      () => {
        this.toggleMapLayer(this._weatherService.weatherProperty);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.toggleMapLayer(this._weatherService.weatherProperty);
    this.cdRef.detectChanges();
  }

  onResized(event: ResizedEvent): void {
    this._map.invalidateSize();
  }

  get isFullScreenModeOn() {
    return this._isFullScreenModeOn;
  }

  get mapScale() {
    return this._mapScale;
  }

  private initMap(): void {

    this._mapScales = new Map<string, WeatherMapScale>()
      .set('temp_new', new WeatherMapScale('Temperature', '°C', [-40, -20, 0, 20, 40], 'temperature-gradient'))
      .set('wind_new', new WeatherMapScale('Wind', 'm/s', [0, 5, 15, 25, 50, 100, 200], 'wind-gradient'))
      .set('pressure_new', new WeatherMapScale('Pressure', 'Pa', [950, 980, 1010, 1040, 1070], 'pressure-gradient'))
      .set('clouds_new', new WeatherMapScale('Clouds', '%', [0, 25, 50, 75, 100], 'clouds-gradient'))
      .set('precipitation_new', new WeatherMapScale('Precipitation', 'mm', [0, 0.1, 0.2, 0.5, 1, 10, 100], 'precipitation-gradient'));

    let bounds = new L.LatLngBounds(
      L.latLng(-this._maxLat, -this._maxLon),
      L.latLng(this._maxLat, this._maxLon)
    );

    this._map = L.map('map', {
      center: L.latLng(50, 10),
      zoom: this._minZoom,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoomControl: false,
      doubleClickZoom: false
    });

    //let mapBase = L.tileLayer(this._weatherService.getMapBase(), {
    //  maxZoom: this._maxZoom,
    //  minZoom: this._minZoom,
    //  attribution: '<a href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap</a>'
    //});

    let at = 'pk.eyJ1IjoiYmJ1bGxlcnQiLCJhIjoiY2txMmZxdzd5MDkxbzJzbzRmcmIzam55cyJ9.IB4ozbivQrsX0hwn2hT3ig';
    //'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token='

    let mapBase = L.tileLayer(
      'https://api.mapbox.com/styles/v1/bbullert/ckpuinirh1a9q17qtx4wy66vm/tiles/{z}/{x}/{y}?access_token=' + at, {
        tileSize: 256,
        maxZoom: this._maxZoom,
        minZoom: this._minZoom,
      attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    mapBase.addTo(this._map);
  }

  flyTo(lat: number, lon: number, zoom: number = this._map.getZoom()) {
    this._map.setView(L.latLng(lat, lon), zoom);
  }

  zoomIn(): void {
    this._map.zoomIn();
  }

  zoomOut(): void {
    this._map.zoomOut();
  }

  toggleMapLayer(newMapLayerType: string) {
    if (this._mapLayer) {
      this._mapLayer.removeFrom(this._map);
    }
    this._mapLayer = L.tileLayer(this._weatherService.getMapWeatherLayer(newMapLayerType), {
      maxZoom: this._maxZoom,
      minZoom: this._minZoom
    });
    this._mapLayer.addTo(this._map);
    this._mapScale = this._mapScales.get(newMapLayerType);
  }

  toggleFullScreenMode(): void {
    this._isFullScreenModeOn = !this._isFullScreenModeOn;
  }
}
