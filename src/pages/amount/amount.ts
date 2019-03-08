import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AmountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-amount',
  templateUrl: 'amount.html',
})
export class AmountPage {
  // Name:string;
  // Num:string;
  jParse :any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private storage: Storage,
    public authService: AuthServiceProvider,) {
  }

  ionViewDidLoad() {  

    this.storage.get('userID').then((val) => {
      this.http.post(this.authService.url+'/api/amount', 
      { user_id: val }, {Authorization: 'OAuth2: token'})
      .then(data => {
        if(data.status == 200)
        {
          this.jParse = JSON.parse(data.data);
          // this.storage.set('leaveName', jParse.leave_name);
          // this.storage.set('amountNum', jParse.amount_num);
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


    // this.storage.get('leaveName').then((val) => {
    //   this.Name = val;
    // });
    // this.storage.get('amountNum').then((val) => {
    //   this.Num = val;
    // });
    console.log('ionViewDidLoad AmountPage');
  }
}
