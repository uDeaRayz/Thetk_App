import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Camera} from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import 'rxjs/add/operator/toPromise';
import {HttpClientModule} from '@angular/common/http'
import { IonicStorageModule } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabHomePage } from '../pages/tab-home/tab-home';
import { TabTimePage } from '../pages/tab-time/tab-time';
import { TabWorkPage } from '../pages/tab-work/tab-work';
import { TabDayoffPage } from '../pages/tab-dayoff/tab-dayoff';
import { TabEtcPage } from '../pages/tab-etc/tab-etc';
import { TimeShowPage } from '../pages/time-show/time-show';
import { WorkCreatePage } from '../pages/work-create/work-create';
import { WorkShowPage } from '../pages/work-show/work-show';
import { DayCreatePage } from '../pages/day-create/day-create';
import { DayShowPage } from '../pages/day-show/day-show';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileupdatePage } from '../pages/profileupdate/profileupdate';
import { LoginPage } from '../pages/login/login';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TimeOutPage } from '../pages/time-out/time-out';
import { TimeInPage } from '../pages/time-in/time-in';
import { AmountPage } from '../pages/amount/amount';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabHomePage,
    TabTimePage,
    TabWorkPage,
    TabDayoffPage,
    TabEtcPage,
    TimeInPage,
    TimeOutPage,
    TimeShowPage,
    WorkCreatePage,
    WorkShowPage,
    DayCreatePage,
    DayShowPage,
    ProfilePage,
    ProfileupdatePage,
    LoginPage,
    AmountPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
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
    TimeShowPage,
    WorkCreatePage,
    WorkShowPage,
    DayCreatePage,
    DayShowPage,
    ProfilePage,
    ProfileupdatePage,
    LoginPage,
    TimeInPage,
    TimeOutPage,
    AmountPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    WebView,
    HTTP,
    AuthServiceProvider,
  ]
})
export class AppModule {}
