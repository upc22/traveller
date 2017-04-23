
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { ImageUploadModule } from 'angular2-image-upload';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppRoutingGuardsService } from './app-routing-guards.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyAI-S2iMnFHY24b7uWkccjCKRt_TBaU578',
  authDomain: 'traveller-98580.firebaseapp.com',
  databaseURL: 'https://traveller-98580.firebaseio.com',
  projectId: 'traveller-98580',
  storageBucket: 'traveller-98580.appspot.com',
  messagingSenderId: '283188344046'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ImageUploadModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBCeI1JAgSC9k-n9yWZ8UzPHmyuN_Z0FpE',
      libraries: ['places']
    })
  ],
  providers: [ AppRoutingGuardsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
