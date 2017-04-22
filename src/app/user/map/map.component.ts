import { Component, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';
import { GoogleMapsAPIWrapper } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  markers = [];
  @Output() toggleNav = new EventEmitter<boolean>();
  lat = 51.678418;
  lng = 7.809007;
  zoom = 13;
  lastIndex = -1;

  constructor(private googleMapsAPIWrapper: GoogleMapsAPIWrapper, private notesService: NotesService) { }
  ngOnInit(): void {
    this.notesService.fetchNotes().subscribe((notes) => this.markers = notes);
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 18;
      });
    }
  }

  mapClicked(evt) {
    this.closeOtherInfoWindow();
    this.markers.push({
      lat: evt.coords.lat,
      lng: evt.coords.lng,
      isOpen: true,
      message: ''
    });
    this.lastIndex = this.markers.length - 1;
  }

  closeOtherInfoWindow() {
    for (const marker of this.markers) {
      marker.isOpen = false;
    }
    if (this.markers[this.lastIndex]) {
      if (!this.markers[this.lastIndex].message) {
        this.markers.splice(this.lastIndex, 1);
      } else {
        this.saveNote(this.lastIndex);
      }
    }
  }

  clickedMarker(marker: {}, index: number) {
    this.closeOtherInfoWindow();
    this.lastIndex = index;
    marker['isOpen'] = true;
    this.toggleNav.emit(true);
  }

  saveNote(index: number) {
    const currentMarker = this.markers[index];
    currentMarker.isOpen = false;
    this.lastIndex = -1;
    this.notesService.saveNote({
      message: currentMarker.message,
      lat: currentMarker.lat,
      lng: currentMarker.lng,
      timestamp: new Date().getTime()
    });
  }
}
