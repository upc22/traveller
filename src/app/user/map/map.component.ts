import { Component, OnChanges, OnInit, Output, EventEmitter, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

import { } from '@types/googlemaps';


declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  markers = [];
  presentLocation = {};
  @Output() toggleNav = new EventEmitter<boolean>();
  lat = 0;
  lng = 0;
  zoom = 2;
  lastIndex = -1;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private googleMapsAPIWrapper: GoogleMapsAPIWrapper, private notesService: NotesService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }
  ngOnInit(): void {
    this.notesService.fetchNotes().subscribe((notes) => this.markers = notes);
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(regions)']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 5;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 14;
        this.presentLocation['lat'] = this.lat;
        this.presentLocation['lng'] = this.lng;
        this.presentLocation['message'] = '';
        this.presentLocation['iconUrl'] = 'assets/images/my-location.png';
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
    this.autoSaveDeleteNotes(this.lastIndex);
  }

  infoWindowClose(index: number) {
    this.autoSaveDeleteNotes(index);
  }

  autoSaveDeleteNotes(index: number) {
    if (this.markers[index]) {
      if (!this.markers[index].message) {
        this.markers.splice(index, 1);
      } else {
        this.saveNote(index);
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
