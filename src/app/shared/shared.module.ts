import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageUploadModule } from 'angular2-image-upload';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  imports:[ CommonModule, ImageUploadModule, FormsModule, ButtonsModule, MaterialModule ],
  declarations: [
    NavBarComponent,
    MenuComponent,
    NoteComponent
  ],
  exports: [
    NavBarComponent,
    MenuComponent,
    NoteComponent
   ]
})
export class SharedModule { }
