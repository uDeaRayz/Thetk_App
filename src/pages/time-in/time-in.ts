import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Platform } from 'ionic-angular';
// import { normalizeURL } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabTimePage } from '../tab-time/tab-time';
import { Geolocation } from '@ionic-native/geolocation';



@IonicPage()
@Component({
  selector: 'page-time-in',
  templateUrl: 'time-in.html',
})


export class TimeInPage {

  PhotoIn: any;
  textQR: any;
  longitude: any;
  latitude: any;

  qrcode = '';
  long = '';
  lat = '';
  picture: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private http: HTTP,
    private storage: Storage,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.textQR = barcodeData.text;

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.latitude = data.coords.latitude
        this.longitude = data.coords.longitude
      });

      let loader = this.loadingCtrl.create({
        content: "Saving..."
      });
      loader.present();
      this.storage.get('userID').then((val) => {
        this.http.post(this.authService.url + 'api/add_in',
          {
            qrcode: this.textQR,
            long: this.longitude, lat: this.latitude,
            user_id: val
          }, { Authorization: 'OAuth2: token' })
          .then(data => {
            if (data.status == 200) {
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
            }
            else {
              loader.dismiss();
              const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: 'บันทึกไม่สำเร็จ',
                buttons: [{
                  text: 'OK',
                  handler: () => {
                    this.navCtrl.push(TabTimePage);
                  }
                }]
              });
              alert.present();
            }
          })
          .catch(error => {
            loader.dismiss();
            const alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: 'บันทึกไม่สำเร็จ',
              buttons: [{
                text: 'OK',
                handler: () => {
                  this.navCtrl.push(TabTimePage);
                }
              }]
            });
            alert.present();
          });
      });
    }).catch(err => {
      console.log('Error', err);
    });
    console.log('ionViewDidLoad TimeInPage');
  }



  // save(){

  //   let loader = this.loadingCtrl.create({
  //     content: "Saving..."
  //   });
  //   loader.present(); 
  //   this.storage.get('userID').then((val) => {
  //     this.http.uploadFile(this.authService.url+'api/add_in', {
  //     qrcode: this.textQR, 
  //     long: this.longitude, lat: this.latitude,
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
  //         subTitle: JSON.stringify(error),
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //       console.log('error -> ' + JSON.stringify(error));
  //     });
  //   });

  // }


  // save(){
  //   let loader = this.loadingCtrl.create({
  //     content: "Saving..."
  //   });

  //   const fileTransfer: FileTransferObject = this.transfer.create();

  //   let options: FileUploadOptions = {
  //     fileKey: 'picture',
  //     fileName: 'picture',
  //     chunkedMode: false,
  //     mimeType: "image/jpeg",
  //     headers: {}
  //   }

  //   fileTransfer.upload(this.PhotoIn, this.authService.url+'api/upload_file', options)
  //     .then((data) => {
  //     console.log(data+" Uploaded Successfully");
  //     // this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
  //     loader.dismiss();
  //     const alert = this.alertCtrl.create({
  //             title: 'Success',
  //             subTitle: JSON.stringify(data),
  //             buttons: [{
  //                   text: 'OK',
  //                   handler: () => {
  //                     this.navCtrl.push(TabTimePage);
  //                   }
  //                 }]
  //           });
  //           alert.present();
  //     this.presentToast(JSON.stringify(data));
  //   }, (err) => {
  //     console.log(err);
  //     loader.dismiss();
  //     const alert = this.alertCtrl.create({
  //       title: 'Error',
  //       subTitle: JSON.stringify(err),
  //       buttons: [{
  //             text: 'OK',
  //             handler: () => {
  //               this.navCtrl.push(TabTimePage);
  //             }
  //           }]
  //     });
  //     alert.present();
  //     this.presentToast(err);
  //   });

  //   // this.storage.get('userID').then((val) => {
  //   // var packData = {
  //   //   picture:this.PhotoIn,
  //   //   qrcode: this.textQR, 
  //   //   // long: this.longitude, 
  //   //   // lat: this.latitude,
  //   //   user_id: val,
  //   // };

  //   // loader.present();

  //   // let headers = new Headers({'Content-Type':'application/json'});
  //   // let body = packData;
  //   //   this.http.post(this.authService.url+'api/add_in', {body,
  //   //   }, { Authorization: 'OAuth2: token' })
  //   //   .then(data => {   
  //   //     loader.dismiss(); 
  //   //     const alert = this.alertCtrl.create({
  //   //       title: 'Success',
  //   //       subTitle: 'บันทึกสำเร็จ',
  //   //       buttons: [{
  //   //             text: 'OK',
  //   //             handler: () => {
  //   //               this.navCtrl.push(TabTimePage);
  //   //             }
  //   //           }]
  //   //     });
  //   //     alert.present();
  //   //     console.log('data -> ' + data.data);

  //   //   })
  //   //   .catch(error => {
  //   //     loader.dismiss(); 
  //   //     const alert = this.alertCtrl.create({
  //   //       title: 'Error',
  //   //       // subTitle: 'บันทึกไม่สำเร็จ',
  //   //       subTitle: JSON.stringify(error) ,
  //   //       buttons: ['OK']
  //   //     });
  //   //     alert.present();
  //   //     console.log('error -> ' + JSON.stringify(error));
  //   //   });
  //   // });

  // }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
