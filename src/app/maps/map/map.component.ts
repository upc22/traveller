import { Component, OnChanges, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  markers = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.fetchNotes().subscribe((notes) => this.markers = notes);
  }

  mapClicked(evt) {
    this.closeOtherInfoWindow();
    this.markers.push({
      lat: evt.coords.lat,
      lng: evt.coords.lng,
      isOpen: true,
      message: ''
    });
  }

  closeOtherInfoWindow() {
    for (const marker of this.markers) {
      marker.isOpen = false;
    }
  }

  clickedMarker(marker: {}) {
    this.closeOtherInfoWindow();
    marker['isOpen'] = true;
  }

  saveNote(index: number) {
    const currentMarker = this.markers[index];
    currentMarker.isOpen = false;
    this.notesService.saveNote({
      message: currentMarker.message,
      lat: currentMarker.lat,
      lng: currentMarker.lng,
      timestamp: new Date().getTime()
    });
  }
}
