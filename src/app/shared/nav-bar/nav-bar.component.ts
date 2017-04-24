import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  @Output() showNav = new EventEmitter<boolean>();
  @Output() itemClicked = new EventEmitter<boolean>();

  notes = [];
  private notesSubscription: Subscription;
  private imagesRef;

  constructor(private notesService: NotesService, private af: AngularFire) {
    this.af.auth.subscribe((auth => {
      this.imagesRef = firebase.storage().ref('images/' + auth.uid);
    }));
  }

  ngOnInit() {
    this.notesService.fetchNotes().subscribe((notes) => {
      for (const note of notes) {
        if (note.images) {
          this.imagesRef.child(note.images).getDownloadURL().then((url) => {
            note.imageUrl = url;
          });
        }
      }
      this.notes = this.notes.concat(notes);
    });
  }

  closeNav() {
    this.showNav.emit(false);
  }

  handleNoteClick(note) {
    this.itemClicked.emit(note);
  }

  ngOnDestroy(): void {
    if (this.notesSubscription) {
      this.notesSubscription.unsubscribe();
    }
  }
}
