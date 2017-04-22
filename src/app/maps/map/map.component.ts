import { Component, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges {

  nodeObject = {};
  markers = [];
  remarks: FormGroup;

  title = 'My first angular2-google-maps project';
  lat = 51.678418;
  lng = 7.809007;

  mapClicked(evt){
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

  constructor(private formBuilder: FormBuilder
) { }

  ngOnChanges() {
    this.addReview();
  }

  addReview(){
    this.remarks = this.formBuilder.group({
      userReview: [Validators.required]
    });
  }

}
