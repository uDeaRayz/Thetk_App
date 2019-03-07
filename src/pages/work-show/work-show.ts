import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the WorkShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-show',
  templateUrl: 'work-show.html',
})
export class WorkShowPage {
  jParse :any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: HTTP,
              private storage: Storage,) {
  }

  ionViewDidLoad() {

    this.storage.get('userID').then((val) => {
      this.http.post('http://192.168.2.165:8000/api/showWork', 
      { user_id: val }, {Authorization: 'OAuth2: token'})
      .then(data => {
        if(data.status == 200)
        {
          this.jParse = JSON.parse(data.data);
          console.log('Success'); 
        }
        else{
          console.log('Data no Match'); 
        }
      })
      .catch(error => {
        console.log(error.status);
      });
    });
    console.log('ionViewDidLoad WorkShowPage');
  }

}
