import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { Router, CanActivateChild, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AppRoutingGuardsService implements CanActivate, CanActivateChild {

  private _userProfileUrl: String;
  constructor(private af: AngularFire, private _router: Router, private _location: Location) {}

  canActivate() {
    return Observable.create((observer: Observer<boolean>)  => {
      this.af.auth.subscribe((auth) => {
        if (auth) {
          const userRef = this.af.database.object('/users/' + auth.uid);
          userRef.update({
            name: auth.auth.displayName
          });
          this._userProfileUrl = '/' + auth.auth.displayName.split(' ')[0].toLowerCase();
          observer.next(true);
        } else {
          this._router.navigate(['/login']);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  canActivateChild() {
    // debugger;
    // if (!this._location.path()) {
    //   this._router.navigate([this._userProfileUrl]);
    //   return false;
    // }
    return true;
  }
}
