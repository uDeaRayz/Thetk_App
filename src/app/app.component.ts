import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TabHomePage } from '../pages/tab-home/tab-home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage:any = LoginPage;
  rootPage:any;
  currentUser:any;
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.rootPage = this.currentUser
                          ? TabHomePage
                          : LoginPage;

      
    });
  }
}
