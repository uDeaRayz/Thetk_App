import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Platform } from 'ionic-angular';
import { normalizeURL } from 'ionic-angular';


// import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-time-in',
  templateUrl: 'time-in.html',
})


export class TimeInPage {

  PhotoIn: any;
  textQR: any;
  filePath: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    private http: HTTP,
    // private storage: Storage,
    public authService: AuthServiceProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeInPage');
  }

  ScanIn() {
    this.barcodeScanner.scan().then(barcodeData => {
      
      this.textQR = barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
     });
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
      console.log(imageData); 

      if (this.platform.is('ios'))
        this.PhotoIn = normalizeURL(imageData);
      else
        this.PhotoIn= "data:image/jpeg;base64," + imageData;

    }, (err) => {
          console.log('ERROR -> ',err);
    });  
  }




  save(){
    this.http.uploadFile('http://192.168.2.165:8000/api/upload_file', {
    }, { Authorization: 'OAuth2: token' }, this.filePath, 'picture')
    .then(data => {   
      console.log('data -> ' + data.data);
      
    })
    .catch(error => {
      console.log('error -> ' + JSON.stringify(error));
    });
  }

}
