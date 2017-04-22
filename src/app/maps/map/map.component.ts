import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  nodeObject = {};
  markers = [];

  lat = 51.678418;
  lng = 7.809007;
  notesRef;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      this.notesRef = this.af.database.list('/users/' + auth.uid + '/notes');
    });
   }

   ngOnInit(): void {
      this.markers
    }

  mapClicked(evt) {
    this.closeOtherInfoWindow();
    this.markers.push({
      lat: evt.coords.lat,
      lng: evt.coords.lng,
      isOpen: true,
      remarks: ''
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

  saveNote(index: number) {
    const currentMarker = this.markers[index];
    currentMarker.isOpen = false;
    this.notesRef.push({
      message: currentMarker.remarks,
      lat: currentMarker.lat,
      lng: currentMarker.lng,
      timestamp: new Date().getTime()
    });
  }
}
