import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {
  name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage) {

    storage.get('user').then((val) => {
      var userI = JSON.parse(val);
      this.name = userI.fname;
      console.log('Your age is', userI.fname);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }



}
