import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() marker;
  @Output() saveNote = new EventEmitter();
  @Output() keydown = new EventEmitter();  

  private title: String;
  private des: String;
  private images: Array<string>;
  private longitude: any;
  private latitude: any;


  constructor() { }

  ngOnInit() {
  }

  submitNote(value){
    console.log(value);
    this.saveNote.emit();
  }

  handleKeyDown(evt){
    this.keydown.emit(evt);
  }

  

}
