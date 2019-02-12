import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DayCreatePage } from '../day-create/day-create';
import { DayShowPage } from '../day-show/day-show';
import { AmountPage } from '../amount/amount';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

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
  amount = AmountPage;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private storage: Storage,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabDayoffPage');
  }

}
