import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';
import { TabTimePage } from '../tab-time/tab-time';

/**
 * Generated class for the TimeOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-out',
  templateUrl: 'time-out.html',
})
export class TimeOutPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeOutPage');
  }

  save(){

    let loader = this.loadingCtrl.create({
      content: "Saving..."
    });
    loader.present();

    this.storage.get('userID').then((val) => {
      this.http.post('http://192.168.2.165:8000/api/add_out', {
      user_id: val,
      }, { Authorization: 'OAuth2: token' })
      .then(data => {   
        loader.dismiss(); 
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'บันทึกสำเร็จ',
          buttons: [{
                text: 'OK',
                handler: () => {
                  this.navCtrl.push(TabTimePage);
                }
              }]
        });
        alert.present();
        console.log('data -> ' + data.data);
        
      })
      .catch(error => {
        loader.dismiss(); 
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'บันทึกไม่สำเร็จ',
          buttons: ['OK']
        });
        alert.present();
        console.log('error -> ' + JSON.stringify(error));
      });
    });

  }

}
