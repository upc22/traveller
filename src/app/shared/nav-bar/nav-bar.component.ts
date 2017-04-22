import { Component, OnInit } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  notes = [];
  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.fetchNotes().subscribe((notes) => this.notes = notes);
  }

  postNote(value) {
    console.log(value);
  }

}
