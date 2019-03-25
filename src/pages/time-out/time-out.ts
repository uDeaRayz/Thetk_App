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
    public toastCtrl: ToastController) {
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
        this.http.post(this.authService.url + 'api/add_out',
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
    console.log('ionViewDidLoad TimeOutPage');
  }
}
