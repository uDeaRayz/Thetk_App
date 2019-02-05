import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HTTP,public authService: AuthServiceProvider
    ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){
    this.navCtrl.push(TabsPage);
  }

  
  submit() {
    console.log(this.email);
    this.http.post('http://127.0.0.1:8000/api/data/post',{ email:'username' },{}).then(data => {
      console.log(data);
    });
  }
}
