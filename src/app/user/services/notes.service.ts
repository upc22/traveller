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
  private publicRef;
  private auth;
  private fetchCount = 0;
  private FETCHED = 2;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.auth = auth;
      this.notesRef = this.af.database.list('/users/' + auth.uid + '/notes');
      this.publicRef = this.af.database.list('/users/public');
    });
  }

  saveNote(note) {
    if (note.isPublic) {
      note.author = this.auth.uid;
      this.publicRef.push(note);
    } else {
      this.notesRef.push(note);
    }
  }

  fetchNotes() {
    return Observable.create((observer: Observer<Array<{}>>) => {
      this.process.next(Action.QueryStart);
      if (this.auth) {
        this.subscribeNotesRef(observer);
        this.subscribePublicRef(observer);
      } else {
        this.af.auth.subscribe((auth) => {
          this.auth = auth;
          this.notesRef = this.af.database.list('/users/' + this.auth.uid + '/notes');
          this.publicRef = this.af.database.list('/users/public');
          this.subscribeNotesRef(observer);
          this.subscribePublicRef(observer);
        });
      }
    });
  }

  private subscribeNotesRef(observer) {
    this.notesRef.subscribe((notes) => {
      observer.next(notes);
      this.fetchCount++;
      // this.checkFetchCount(observer);
    }, (err) => {
      observer.error(err);
    });
  }

  private subscribePublicRef(observer) {
    this.publicRef.subscribe((notes) => {
      observer.next(notes);
      this.fetchCount++;
      // this.checkFetchCount(observer);
    }, (err) => {
      observer.error(err);
    });
  }

  private checkFetchCount(observer) {
    if (this.fetchCount === this.FETCHED) {
      this.fetchCount = 0;
      observer.complete();
      this.process.next(Action.QueryStop);
    }
  }
}
