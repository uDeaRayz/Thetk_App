import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-work-create',
  templateUrl: 'work-create.html',
})
export class WorkCreatePage {

  myPhoto: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkCreatePage');
  }

  
    takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  

}
