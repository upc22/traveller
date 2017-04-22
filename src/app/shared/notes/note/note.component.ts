import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  private title: String;
  private des: String;
  private images: Array<string>;
  private longitude: any;
  private latitude: any;


  constructor() { }

  ngOnInit() {
  }

  

}
