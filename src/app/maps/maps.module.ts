import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';


import { MapsRoutingModule } from './maps-routing.module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    MapsRoutingModule
  ],
  declarations: [ MapComponent ]
})
export class MapsModule { }
