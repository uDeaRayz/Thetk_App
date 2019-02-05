import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';


// import { Http } from '@angular/http';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email = '';
  password = '';
  test ='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HTTP,public authService: AuthServiceProvider,
    private storage: Storage
    ) {      

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submit(){
    // console.log(this.email);   แสดงค่าจาก input 
    this.http.post('http://192.168.2.165:8000/api/login', {
      email: this.email,
      password: this.password,
    }, { Authorization: 'OAuth2: token' })
    .then(data => {
      // console.log(data.status);
      // console.log(data.data); 
      //this.storage.set('id', data.data.id);
      this.storage.set('user', JSON.stringify(data.data));
      let test = JSON.stringify(data.data);
      console.log(test);
      this.navCtrl.push(TabsPage);
    })
    .catch(error => {
      console.log(error.status);
    });
  }
}
