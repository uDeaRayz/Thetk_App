import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';





@IonicPage()
@Component({
  selector: 'page-work-create',
  templateUrl: 'work-create.html',
  providers: [[Camera]]
})
export class WorkCreatePage {

  myPhoto: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private http: HTTP
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkCreatePage');
    
  }

  test()
  {
    // this.http.post('http://127.0.0.1:8000/api/data/post',{email: 'text'} ,{}).then(data => {
    //     console.log(data);
    //   });
  }
  takePhoto(pictureSourceType: any){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: pictureSourceType,//this.camera.PictureSourceType.CAMERA,
      // saveToPhotoAlbum: true,
      // correctOrientation: true,
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      
        }, (err) => {
         console.log('ERROR -> ' + JSON.stringify(err));

    });

    
  }
}
