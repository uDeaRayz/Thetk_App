import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the TimeShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-time-show',
  templateUrl: 'time-show.html',
})
export class TimeShowPage {
  time :any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private storage: Storage,
    public authService: AuthServiceProvider,
    ) {
  }
 
  ionViewDidLoad() {
    this.storage.get('userID').then((val) => {
      this.http.post(this.authService.url+'api/showTime', 
      { user_id: val }, {Authorization: 'OAuth2: token'})
      .then(data => {
        if(data.status == 200)
        {
          this.time = JSON.parse(data.data);
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
    console.log('ionViewDidLoad TimeShowPage');
  }

}
