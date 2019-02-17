import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-time-in',
  templateUrl: 'time-in.html',
})


export class TimeInPage {

  PhotoIn: any;
  textQR: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner,
    private http: HTTP,
    private storage: Storage,
    public authService: AuthServiceProvider,
    // private transfer: FileTransfer,
    // private file: File,
    public loadingCtrl: LoadingController,
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
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: pictureSourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.PhotoIn = 'data:image/jpeg;base64,' + imageData;
      // this.http.post('http://192.168.2.165:8000/api/upload_file', {
      //   file: this.PhotoIn,
      // }, { Authorization: 'OAuth2: token' })
      // .then(data => {   
      //   // console.log('data -> ' + data.data.msg);
        
      // })
      // .catch(error => {
        
      // });
      
      console.log(options);
    }, (err) => {
          console.log('ERROR -> ',err);
    });  
  }

  save(){

    this.storage.get('userID').then((val) => {
      var packData = {
        PhotoIn: this.PhotoIn,
      }
      let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      let body = packData;
      loader.present();
      this.http.post('http://172.20.10.2:8000/api/upload_file', body, { Authorization: 'OAuth2: token' })
      .then(data => {
        if(data.status == 200)
        {
          loader.dismiss(); 
          alert('Sussess');
          console.log(JSON.stringify(data)); 
        }
        else{
          console.log(JSON.stringify(data));
        alert('Error');
        loader.dismiss();
        }
      })
      .catch(error => {
        console.log(error.status);
      });
    });



    // .then((data) => {
    //   loader.dismiss(); 
    //   alert('Sussess');
    //   console.log(JSON.stringify(data)); 
    // }, (err) => {
    //   console.log(JSON.stringify(err));
    //   alert('Error');
    //   loader.dismiss();
    // })
  }

}
