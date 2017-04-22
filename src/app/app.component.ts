import { Component } from '@angular/core';
import { MdIconRegistry, MdDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer, private dialog: MdDialog) {
  }
}