import { Component, state } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { TimeInPage } from '../time-in/time-in';
import { TimeOutPage } from '../time-out/time-out';
import { LocalNotifications } from '@ionic-native/local-notifications';


@IonicPage()
@Component({ 
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {
  today = Date.now();
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    public alertCtrl: AlertController,
  ) {

    this.platform.ready().then(() =>{
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }

  In(){
    this.navCtrl.push(TimeInPage);
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });
  }
  Out(){
    this.navCtrl.push(TimeOutPage);
  }

  


}
