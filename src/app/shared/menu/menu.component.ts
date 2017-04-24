import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() toggleNav = new EventEmitter<boolean>();
  flag: boolean = false;
  constructor(private af: AngularFire, private router: Router) { }

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

  logOut() {
    this.af.auth.logout().then(() => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/']);
    });
  }

}
