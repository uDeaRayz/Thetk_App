import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DayCreatePage } from '../day-create/day-create';
import { DayShowPage } from '../day-show/day-show';

/**
 * Generated class for the TabDayoffPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-dayoff',
  templateUrl: 'tab-dayoff.html',
})
export class TabDayoffPage {

  create = DayCreatePage;
  show = DayShowPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabDayoffPage');
  }

}
