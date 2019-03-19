import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Platform } from 'ionic-angular';
import { normalizeURL } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabTimePage } from '../tab-time/tab-time';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

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

  PhotoOut: any;
  filePath: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private camera: Camera,
    public platform: Platform,
    private AuthServiceProvider:AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeOutPage');
  }
 // ฟังก์ชันการถ่ายภาพ
 takePhoto(pictureSourceType: any){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: pictureSourceType,
  }
  this.camera.getPicture(options).then((imageData) => {
    this.filePath = imageData;
    // console.log(this.filePath); 

    if (this.platform.is('ios'))
      this.PhotoOut = normalizeURL(imageData);
    else
      this.PhotoOut= "data:image/jpeg;base64," + imageData;

  }, (err) => {
        console.log('ERROR -> ',err);
  });  
}
  save(){

    let loader = this.loadingCtrl.create({
      content: "Saving..."
    });
    loader.present();

    this.storage.get('userID').then((val) => {
      this.http.uploadFile(this.AuthServiceProvider.url+'api/add_out', {
      user_id: val,
      }, { Authorization: 'OAuth2: token' },this.filePath,'picture')
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

  upload(){
    this.http.uploadFile('http://192.168.2.165:8000/api/upload_file', {
    }, { Authorization: 'OAuth2: token' },this.filePath,'picture')
    .then(data => {   
      console.log('data -> ' + data.data);
      
    })
    .catch(error => {
      console.log('error -> ' + JSON.stringify(error));
    });
  }

}
