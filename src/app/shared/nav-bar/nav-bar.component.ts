import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Output() showNav = new EventEmitter<boolean>();
  notes = [];
  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.fetchNotes().subscribe((notes) => this.notes = notes);
  }

  closeNav() {
    this.showNav.emit(false);
  }

}
