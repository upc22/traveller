import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isNavVisible = false;
  selectedNote: {};
  constructor() { }

  toggleNavBar(toggle) {
    this.isNavVisible = toggle;
  }

  handleItemClicked(note) {
    this.selectedNote = note;
  }
}
