import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentComponent } from './views/current/current.component';
import { ForecastComponent } from './views/forecast/forecast.component';
import { MapComponent } from './views/map/map.component';

const routes: Routes = [
  { path: '', component: CurrentComponent },
  { path: 'current', component: CurrentComponent },
  { path: 'forecast', component: ForecastComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
