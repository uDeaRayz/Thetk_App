import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,LoadingController } from 'ionic-angular';
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
  email = 'staff@test.com';
  password = '0960030344';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    public authService: AuthServiceProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    ) {      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submit(){

    let loader = this.loadingCtrl.create({
      // content: "Waiting..."
    });
    loader.present();

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
        this.storage.set('url', 'http://192.168.2.165:8000/');
        console.log('Login Success'); 
        loader.dismiss(); 
        this.navCtrl.push(TabsPage);
      }
      else{
        const alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Email or Password is wrong!',
          buttons: ['OK']
        });
        alert.present();
        loader.dismiss(); 
        console.log('Login Fail'); 
      }
    })
    .catch(error => {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please try again!',
        buttons: ['OK']
      });
      alert.present();
      loader.dismiss(); 
      console.log(error.status);
    });
  }
}
