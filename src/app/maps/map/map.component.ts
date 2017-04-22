import { Component, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {

  nodeObject = {};
  markers = [];
  remarks: string;

  title = 'My first angular2-google-maps project';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  mapClicked(evt) {
    this.closeOtherInfoWindow();
    this.markers.push({
      lat: evt.coords.lat,
      lng: evt.coords.lng,
      isOpen: true
    });
    this.nodeObject['lat'] = evt.coords.lat;
    this.nodeObject['lng'] = evt.coords.lng;
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

  ngOnChanges() {
    this.addReview();
  }

  addReview() {}
}
