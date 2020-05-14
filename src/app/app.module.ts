import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase,
} from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyBfQxGvtt7_D669ewPXvnMKwZVxQU3v2p0",
    authDomain: "ionic-72aad.firebaseapp.com",
    databaseURL: "https://ionic-72aad.firebaseio.com",
    projectId: "ionic-72aad",
    storageBucket: "ionic-72aad.appspot.com",
    messagingSenderId: "424129003524",
    appId: "1:424129003524:web:a09ac2a55bae9b9eaaf551",
    measurementId: "G-YF629B32T9"
  };
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
