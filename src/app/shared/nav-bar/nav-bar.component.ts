import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Output() showNav = new EventEmitter<boolean>();
  private notes = [];
  private notesSubscription: Subscription;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.fetchNotes().subscribe((notes) => this.notes = this.notes.concat(notes));
  }

  closeNav() {
    this.showNav.emit(false);
  }

  ngOnDestroy(): void {
    if(this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
}
