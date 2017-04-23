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

  editable: boolean = false;
  isLiked = 'favorite-outline';
  likes = 0;

  constructor() { }

  ngOnInit() {
    if (!this.marker.title && !this.marker.message) {
      this.editable = true;
    }
  }

  submitNote($event, form) {
    $event.preventDefault();
    if (form.valid) {
      this.saveNote.emit();
    }
  }

  imageUpload(evt) {
    this.imagePlaced.emit(evt.file);
  }

  sendLike() {
    if (this.isLiked === 'favorite-outline') {
      this.isLiked = 'favorite';
      this.likes++;
    } else {
      this.likes--;
      this.isLiked = 'favorite-outline';

    }
    //this.liked.emit();
  }
}
