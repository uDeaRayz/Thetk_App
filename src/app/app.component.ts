import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import {Storage} from '@ionic/storage'
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = LoginPage;
  // rootPage:any;
  // currentUser:any;
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, storage: Storage,
    public authService: AuthServiceProvider, ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.authService.getUser().then((user) => {
        if (!user == null) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage;
        }
      });
    });
  }
}
