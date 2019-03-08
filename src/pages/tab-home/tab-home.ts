import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { TimeInPage } from '../time-in/time-in';
import { TimeOutPage } from '../time-out/time-out';


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

  }
  Out(){
    this.navCtrl.push(TimeOutPage);
  }

  


}
