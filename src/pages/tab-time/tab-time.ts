import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeShowPage } from '../time-show/time-show';
import { TimeInPage } from '../time-in/time-in';
import { TimeOutPage } from '../time-out/time-out';



@IonicPage()
@Component({
  selector: 'page-tab-time',
  templateUrl: 'tab-time.html',
})
export class TabTimePage {
  in = TimeInPage;
  out = TimeOutPage;
  show = TimeShowPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabTimePage');
  }
  gotoHistory(){
    // this.navCtrl.push();
  }
}
