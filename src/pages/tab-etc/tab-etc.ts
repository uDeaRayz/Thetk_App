import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TabEtcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-tab-etc',
  templateUrl: 'tab-etc.html',
})
export class TabEtcPage {

  img : any;
  fname : string;
  lname : string;
  url : string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public app: App,
    ) {
  }

  ionViewDidLoad() {
    this.storage.get('userfName').then((val) => {
      this.fname = val;
    });
    this.storage.get('userlName').then((val) => {
      this.lname = val;
    });
    this.storage.get('userImg').then((val) => {
      this.img = val;
    });
    this.storage.get('url').then((val) => {
      this.url = val;
    });


    console.log('ionViewDidLoad TabEtcPage');
    console.log('ionViewDidLoad TabEtcPage');
  }

  logout(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }
}
