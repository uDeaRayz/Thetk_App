import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
// import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabHomePage } from '../pages/tab-home/tab-home';
import { TabTimePage } from '../pages/tab-time/tab-time';
import { TabWorkPage } from '../pages/tab-work/tab-work';
import { TabDayoffPage } from '../pages/tab-dayoff/tab-dayoff';
import { TabEtcPage } from '../pages/tab-etc/tab-etc';
import { TimeCreatePage } from '../pages/time-create/time-create';
import { TimeShowPage } from '../pages/time-show/time-show';
import { WorkCreatePage } from '../pages/work-create/work-create';
import { WorkShowPage } from '../pages/work-show/work-show';
import { DayCreatePage } from '../pages/day-create/day-create';
import { DayShowPage } from '../pages/day-show/day-show';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileupdatePage } from '../pages/profileupdate/profileupdate';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabHomePage,
    TabTimePage,
    TabWorkPage,
    TabDayoffPage,
    TabEtcPage,
    TimeCreatePage,
    TimeShowPage,
    WorkCreatePage,
    WorkShowPage,
    DayCreatePage,
    DayShowPage,
    ProfilePage,
    ProfileupdatePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabHomePage,
    TabTimePage,
    TabWorkPage,
    TabDayoffPage,
    TabEtcPage,
    TimeCreatePage,
    TimeShowPage,
    WorkCreatePage,
    WorkShowPage,
    DayCreatePage,
    DayShowPage,
    ProfilePage,
    ProfileupdatePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    // Http,
    HTTP,
  ]
})
export class AppModule {}
