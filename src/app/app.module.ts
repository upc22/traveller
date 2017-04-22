
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './adminLayout/admin-layout.component';
import { AppRoutes } from './app.routing';
import { CoreModule } from './core/core.module';
import { MenuItems } from './admin/admin.menu';
import { SharedModule } from './shared/shared.module';
import { NguiMapModule } from '@ngui/map';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import 'hammerjs';
import { LoginComponent } from 'app/login/login.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

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
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBCeI1JAgSC9k-n9yWZ8UzPHmyuN_Z0FpE'}),
    ButtonsModule
  ],
  providers: [MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }