import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkShowPage } from '../work-show/work-show';
import { WorkCreatePage } from '../work-create/work-create';

/**
 * Generated class for the TabWorkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-work',
  templateUrl: 'tab-work.html',
})
export class TabWorkPage {

  show= WorkShowPage;
  create = WorkCreatePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabWorkPage');
  }



}
 