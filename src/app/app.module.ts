import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClientModule} from "@angular/common/http"; // importing http client for REST api's

// angular firebase module
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment'; //added 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Camera} from '@ionic-native/camera/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
            AngularFireModule.initializeApp(environment.firebase), // added firebase module
            AngularFireAuthModule, // adding angular fire authentication module
            HttpClientModule, // http client added
            AngularFirestoreModule, // adding firestore module
            BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule],
  providers: [
    SocialSharing,
    Camera,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
