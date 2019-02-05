import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
    // set a key/value
    storage.set('name', 'Max');

    // Or to get a key/value pair
    storage.get('age').then((val) => {
      console.log('Your age is', val);
    });
  }


}
