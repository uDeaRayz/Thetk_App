import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Platform } from 'ionic-angular';
// import { normalizeURL } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabTimePage } from '../tab-time/tab-time';
import { Geolocation } from '@ionic-native/geolocation';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-time-in',
  templateUrl: 'time-in.html',
})


export class TimeInPage {

  PhotoIn: any;
  textQR:any;
  longitude: any;
  latitude: any;

  qrcode = '';
  long = '';
  lat = '';
  picture : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    private http: HTTP,
    private storage: Storage,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
  ) {
  }

  ionViewDidLoad() {
    this.barcodeScanner.scan().then(barcodeData => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      }
      this.camera.getPicture(options).then((imageData) => {
          this.PhotoIn = "data:image/jpeg;base64," + imageData;
      }, (err) => {
      });  
     }).catch(err => {
         console.log('Error', err);
     });
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
     this.latitude = data.coords.latitude
     this.longitude  =  data.coords.longitude
     });

    console.log('ionViewDidLoad TimeInPage');
  }

  // ScanIn() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     const options: CameraOptions = {
  //       quality: 100,
  //       destinationType: this.camera.DestinationType.DATA_URL,
  //       encodingType: this.camera.EncodingType.JPEG,
  //       mediaType: this.camera.MediaType.PICTURE,
  //     }
  //     this.camera.getPicture(options).then((imageData) => {
  //         this.PhotoIn = "data:image/jpeg;base64," + imageData;
  //     }, (err) => {
  //     });  
  //    }).catch(err => {
  //        console.log('Error', err);
  //    });
  //    let watch = this.geolocation.watchPosition();
  //    watch.subscribe((data) => {
  //    this.latitude = data.coords.latitude
  //    this.longitude  =  data.coords.longitude
  //    });
  // }

  // save(){

  //   let loader = this.loadingCtrl.create({
  //     content: "Saving..."
  //   });
  //   loader.present(); 
  //   this.storage.get('userID').then((val) => {
  //     this.http.uploadFile(this.authService.url+'api/add_in', {
  //     qrcode: this.textQR, long: this.longitude, lat: this.latitude,
  //     user_id: val,
  //     }, { Authorization: 'OAuth2: token' },this.PhotoIn,'picture')
  //     .then(data => {   
  //       loader.dismiss(); 
  //       const alert = this.alertCtrl.create({
  //         title: 'Success',
  //         subTitle: 'บันทึกสำเร็จ',
  //         buttons: [{
  //               text: 'OK',
  //               handler: () => {
  //                 this.navCtrl.push(TabTimePage);
  //               }
  //             }]
  //       });
  //       alert.present();
  //       console.log('data -> ' + data.data);
        
  //     })
  //     .catch(error => {
  //       loader.dismiss(); 
  //       const alert = this.alertCtrl.create({
  //         title: 'Error',
  //         subTitle: 'บันทึกไม่สำเร็จ',
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //       console.log('error -> ' + JSON.stringify(error));
  //     });
  //   });

  // }


  save(){
    let loader = this.loadingCtrl.create({
      content: "Saving..."
    });

    this.storage.get('userID').then((val) => {
    var packData = {
      picture:this.PhotoIn,
      qrcode: this.textQR, 
      long: this.longitude, 
      lat: this.latitude,
      user_id: val,
    };
    
    loader.present();

    let headers = new Headers({'Content-Type':'application/json'});
    let body = packData;
      this.http.post(this.authService.url+'api/add_in', {body,
      }, { Authorization: 'OAuth2: token' })
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
          // subTitle: 'บันทึกไม่สำเร็จ',
          subTitle: JSON.stringify(error) ,
          buttons: ['OK']
        });
        alert.present();
        console.log('error -> ' + JSON.stringify(error));
      });
    });

  }

}
