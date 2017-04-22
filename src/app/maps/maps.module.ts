import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapsRoutingModule } from './maps-routing.module';
import { MapComponent } from './map/map.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { NotesService } from 'app/maps/services/notes.service';
import { GoogleMapsAPIWrapper } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    FormsModule,
    MapsRoutingModule,
    ButtonsModule
  ],
  declarations: [ MapComponent ],
  providers: [NotesService, GoogleMapsAPIWrapper]
})
export class MapsModule { }
