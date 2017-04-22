import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NoteComponent } from './note/note.component';
import { MdCardModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    NotesRoutingModule
  ],
  declarations: [NoteComponent]
})
export class NotesModule { }
