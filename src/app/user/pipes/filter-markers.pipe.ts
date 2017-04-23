import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMarkers',
  pure: false
})
export class FilterMarkersPipe implements PipeTransform {

  transform(values: any, latb: any, latf: any, lngf: any, lngb: any): any {
    const list = [];
    for (const item of values) {
      if (item.lng >= latb && item.lng <= latf && item.lat >= lngf && item.lat <= lngb) {
        list.push(item);
      }
    }
    return list;
  }

}
