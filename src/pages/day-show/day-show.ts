import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DaywaitPage } from '../daywait/daywait';
import { DayallowPage } from '../dayallow/dayallow';
import { DaynotPage } from '../daynot/daynot';
/**
 * Generated class for the DayShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day-show',
  templateUrl: 'day-show.html',
})
export class DayShowPage {
  leave :any;

  wait = DaywaitPage;
  allow = DayallowPage;
  not = DaynotPage;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DayShowPage');
  }

}
