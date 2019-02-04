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
  // data:any = {};
  // link = "";
  // myData = "";
  email = '';


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private http: HTTP,public authService: AuthServiceProvider
    ) {
    // this.data.email = '';
    // this.data.response = '';

    // this.http = http;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.navCtrl.push(TabsPage);
  }
  // submit() {
  //    this.link = 'http://127.0.0.1:777/api/user';
  //   this.myData = JSON.stringify({email: this.data.email});
  //   console.log(this.data.email);
  //   // this.http.post(link, myData)
  //   // .subscribe(data => {
  //   //   this.data.response = data["_body"];
  //   // }, error => {
  //   //   console.log("Oooops!");
  //   // });
  // }


  submit() {

    // let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(this.email);
    this.http.post('http://127.0.0.1:8000/api/data/post',{ email:'username' },{}).then(data => {
      console.log(data);
    });

    
    //   this.http.post('http://http://127.0.0.1:8000/api/data/create', { email:this.email }, { headers: headers})
    // .then(data => {)

    //   console.log(data);
    //   // console.log(data.data); // data received by server
    //   // console.log(data.headers);

    // })
    // .catch(error => {

    //   // console.log(error.status);
    //   // console.log(error.error); // error message as string
    //   // console.log(error.headers);

    // });
  }
}
