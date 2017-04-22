import { FormsModule } from '@angular/forms';
import { PanelBarModule } from '@progress/kendo-angular-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports:[ CommonModule, FormsModule, ButtonsModule, PanelBarModule, MaterialModule ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    NavBarComponent,
    MenuComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    NavBarComponent,
    MenuComponent
   ]
})
export class SharedModule { }
