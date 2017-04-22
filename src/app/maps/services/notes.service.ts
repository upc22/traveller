import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';


export enum Action { QueryStart, QueryStop };

@Injectable()
export class NotesService {
  process: EventEmitter<any> = new EventEmitter<any>();
  authFailed: EventEmitter<any> = new EventEmitter<any>();

  private notesRef;
  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.notesRef = this.af.database.list('/users/' + auth.uid + '/notes');
    });
  }

  saveNote(note) {
    this.notesRef.push(note);
  }

  fetchNotes() {
    return Observable.create((observer: Observer<Array<{}>>) => {
      this.process.next(Action.QueryStart);
      if (this.notesRef) {
        this.subscribeNotesRef(observer);
      } else {
        this.af.auth.subscribe((auth) => {
          this.notesRef = this.af.database.list('/users/' + auth.uid + '/notes');
          this.subscribeNotesRef(observer);
        });
      }
    });
  }

  private subscribeNotesRef(observer) {
    this.notesRef.subscribe((notes) => {
      observer.next(notes);
      observer.complete();
      this.process.next(Action.QueryStop);
    }, (err) => {
      observer.error(err);
    });
  }
}
