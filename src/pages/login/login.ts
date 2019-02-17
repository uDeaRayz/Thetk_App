import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  email = 'admin@test.com';
  password = '111111';

 



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    ) {      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submit(){
    this.http.post('http://172.20.10.2:8000/api/login', {
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
        this.storage.set('url', 'http://172.20.10.2:8000/');
        console.log('Login Success'); 
        this.navCtrl.push(TabsPage);
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Email or Password is wrong!',
          buttons: ['OK']
        });
        alert.present();
        console.log('Login Fail'); 
      }
    })
    .catch(error => {
      const alert = this.alertCtrl.create({
        title: 'error',
        subTitle: 'Email or Password is wrong!',
        buttons: ['OK']
      });
      alert.present();
      console.log(error.status);
    });
  }
}
