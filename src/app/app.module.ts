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
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';
import { OneSignal } from '@ionic-native/onesignal';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
import { LoginPage } from '../pages/login/login';
import { TimeOutPage } from '../pages/time-out/time-out';
import { TimeInPage } from '../pages/time-in/time-in';
import { AmountPage } from '../pages/amount/amount';
import { DaywaitPage } from '../pages/daywait/daywait';
import { DayallowPage } from '../pages/dayallow/dayallow';
import { DaynotPage } from '../pages/daynot/daynot';




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
    LoginPage,
    AmountPage,
    DaywaitPage,
    DayallowPage,
    DaynotPage

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
    LoginPage,
    TimeInPage,
    TimeOutPage,
    AmountPage,
    DayallowPage,
    DaynotPage,
    DaywaitPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    WebView,
    HTTP,
    AuthServiceProvider,
    BarcodeScanner,
    FileTransfer,
    File,
    Geolocation,
    LocalNotifications,
    OneSignal,
  ]
})
export class AppModule {}
