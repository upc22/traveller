import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() marker;
  @Output() saveNote = new EventEmitter();
  @Output() imagePlaced = new EventEmitter<{}>();
  @Output() liked = new EventEmitter();

  editable = false;

  constructor() { }

  ngOnInit() {
    if (!this.marker.title && !this.marker.message) {
      this.editable = true;
    }
  }

  submitNote(form) {
    if (form.valid) {
      this.saveNote.emit();
    }
  }

  imageUpload(evt) {
    this.imagePlaced.emit(evt.file);
  }

  sendLike() {
    this.liked.emit();
  }
}
