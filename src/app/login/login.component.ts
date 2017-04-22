
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFire, private _router: Router) {
    this.af.auth.subscribe((auth) => {
      if (auth) {
        const userRef = af.database.object('/users/' + auth.uid);
        userRef.update({
          name: auth.auth.displayName
        });
        this._router.navigate(['/' + auth.auth.displayName.split(' ')[0]]);
      }
    });
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }
  loginWithFB() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }

}
