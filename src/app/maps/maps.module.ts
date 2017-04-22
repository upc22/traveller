import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguiMapModule } from '@ngui/map';

import { MapsRoutingModule } from './maps-routing.module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    MapsRoutingModule,
    NguiMapModule
  ],
  declarations: [MapComponent]
})
export class MapsModule { }
