import { NgModule } from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MaterialModule } from '@angular/material';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports:[ ButtonsModule, MaterialModule ],
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
