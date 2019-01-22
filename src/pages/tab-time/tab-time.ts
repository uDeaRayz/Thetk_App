import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimeCreatePage } from '../time-create/time-create';
import { TimeShowPage } from '../time-show/time-show';

/**
 * Generated class for the TabTimePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-time',
  templateUrl: 'tab-time.html',
})
export class TabTimePage {
  create = TimeCreatePage;
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
