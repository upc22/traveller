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
    this.markers.push({
      lat: evt.coords.lat,
      lng: evt.coords.lng
    });
    this.nodeObject['lat'] = evt.coords.lat;
    this.nodeObject['lng'] = evt.coords.lng;
    console.log(evt);
  }

  clickedMarker(index: number) {
    console.log(`clicked the marker: ${index}`);
  }


  ngOnChanges() {
    this.addReview();
  }

  addReview() {}
}
