import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() toggleNav = new EventEmitter<boolean>();
  flag: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleNoteList() {
    if (this.flag) {
      this.flag = false;
      this.toggleNav.emit(this.flag);
    } else {
      this.flag = true;
      this.toggleNav.emit(this.flag);
    }
  }

}
