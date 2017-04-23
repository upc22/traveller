import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports:[ CommonModule, FormsModule, ButtonsModule, MaterialModule ],
  declarations: [
    NavBarComponent,
    MenuComponent
  ],
  exports: [
    NavBarComponent,
    MenuComponent
   ]
})
export class SharedModule { }
