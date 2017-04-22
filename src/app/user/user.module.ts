import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { NotesService } from 'app/user/services/notes.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MapComponent } from 'app/user/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    SharedModule,
    UserRoutingModule,
    ButtonsModule,
    FormsModule
  ],
  declarations: [HomeComponent, MapComponent],
  providers: [NotesService]
})
export class UserModule { }
