import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email = 'test@test.com';
  password = '0900000000';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    public authService: AuthServiceProvider,
    private storage: Storage
    ) {      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submit(){
    this.http.post('http://192.168.2.165:8000/api/login', {
      email: this.email,
      password: this.password,
    }, { Authorization: 'OAuth2: token' })
    .then(data => {
      if(data.status == 200)
      {
        let jParse = JSON.parse(data.data);
        this.storage.set('userID', jParse.id);
        this.storage.set('userfName', jParse.fname);
        this.storage.set('userlName', jParse.lname);
        this.storage.set('userImg', jParse.img);
        console.log('Login Success'); 
        this.navCtrl.push(TabsPage);
      }
      else{
        console.log('Login Fail'); 
      }
    })
    .catch(error => {
      console.log(error.status);
    });
  }
}
