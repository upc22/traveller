import { Component, OnChanges, OnInit, Output, EventEmitter, NgZone, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { NotesService } from 'app/user/services/notes.service';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { Subscription } from 'rxjs/Subscription';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  markers = [];
  presentLocation = {};
  @Output() toggleNav = new EventEmitter<boolean>();
  lat = 0;
  lng = 0;
  zoom = 2;
  lastIndex = -1;
  bounds = {
    lat : {f: 0 , b : 0 },
    lng : {f: 0 , b : 0 },
  };
  private notesSubscription: Subscription;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  private imagesRef;
  private auth;

  constructor(private googleMapsAPIWrapper: GoogleMapsAPIWrapper,
    private notesService: NotesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private af: AngularFire) {
      this.af.auth.subscribe((auth => {
        this.auth = auth;
        this.imagesRef = firebase.storage().ref('images/' + auth.uid);
      }));
    }

  ngOnInit(): void {
    this.setCurrentPosition();
    this.getNotes();
    this.handleAutoComplete();
  }

  private getNotes() {
    this.notesSubscription = this.notesService.fetchNotes().subscribe((notes) => {
      this.markers = this.markers.concat(notes);
    });
  }

  private getBounds($event) {
    this.bounds.lat = $event.f;
    this.bounds.lng = $event.b;
  }

  private handleAutoComplete() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = this.setZoomLevel(place.address_components[0].types[0]);
        });
      });
    });
  }

  private setZoomLevel(type: string) {
    switch (type) {
      case 'sublocality_level_1': return 15;
      case 'locality': return 13;
      case 'administrative_area_level_2': return 9;
      case 'administrative_area_level_1': return 7;
      case 'country': return 5;
      default: return 8;
    }
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
    this.lat = 0;
    this.lng = 0;
  }

  mapClicked(evt) {
    this.closeOtherInfoWindow();
    this.markers.push({
      lat: evt.coords.lat,
      lng: evt.coords.lng,
      isOpen: true,
      isSave: false,
      isPublic: true,
      title: '',
      message: '',
      iconUrl: 'assets/images/new-marker.png'
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
        this.deleteMarker(index);
      } else {
        this.saveNote(index);
      }
    }
  }

  handleKeyDown($event, index) {
    const marker = this.markers[index];
    marker.isSave = true;
    if ($event.keyCode === 13) {
      marker.isOpen = false;
      this.autoSaveDeleteNotes(index);
    }
  }

  clickedMarker(marker: {}, index: number) {
    this.closeOtherInfoWindow();
    this.lastIndex = index;
    marker['isOpen'] = true;
    this.toggleNav.emit(true);
  }

  deleteMarker(index) {
    this.markers.splice(index, 1);
  }

  saveNote(index: number) {
    const currentMarker = this.markers[index];
    currentMarker.isOpen = false;
    if (currentMarker.isSave) {
      currentMarker.isSave = false;
      console.log(currentMarker);
      this.lastIndex = -1;
      this.notesService.saveNote({
        title: currentMarker.title,
        message: currentMarker.message,
        lat: currentMarker.lat,
        lng: currentMarker.lng,
        isPublic: currentMarker.isPublic,
        timestamp: new Date().getTime()
      });
    }
  }

  uploadImage(file) {
    const imageRef = this.imagesRef.child(new Date().getTime().toString() + '.jpg');
  }

  ngOnDestroy(): void {
      this.notesSubscription.unsubscribe();
    }
}
