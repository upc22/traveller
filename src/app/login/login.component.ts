
import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFire) {
    this.af.auth.subscribe((auth) => {
      const userRef = af.database.object('/users/' + auth.uid);
      userRef.update({
        name : auth.auth.displayName
      });
    });
   }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Redirect
    });
  }
  loginWithFB() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Redirect
    });
  }

}
