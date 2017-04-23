
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router) {}

  ngOnInit() {
  }

  login(authProvider: string) {
    this.af.auth.login({
      provider: authProvider === 'google' ? AuthProviders.Google : AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(response => {
      this.router.navigate(['/' + response.auth.displayName.split(' ')[0].toLowerCase()]);
    }).catch(err => {
      console.log(err);
    });
  }
  loginWithFB() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
      scope: ['email', 'user_friends']
    });
  }
}
