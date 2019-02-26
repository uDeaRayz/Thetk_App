import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';






@IonicPage()
@Component({
  selector: 'page-work-create',
  templateUrl: 'work-create.html',
  providers: [[Camera]]
})
export class WorkCreatePage {

  // ตัวแปร ของรูปภาพ
  myPhoto: any;
  jParse: any;
  dist:any;
  provinceID: any;
  amphoeID: any;
  arrAmphoe: any;
  arrTambon: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private http: HTTP,
    private storage: Storage,
    ) {
  }

  ionViewDidLoad() {

    // Province
    this.http.get('http://192.168.2.165:8000/api/province', {}, {})
    .then(data => {
        if(data.status == 200)
        {
          this.jParse = JSON.parse(data.data);
          console.log('Success'); 
        }
        else{
          console.log('Data no Match'); 
        } 
      })
      .catch(error => {
        console.log(error.status);
      });
    console.log('ionViewDidLoad WorkCreatePage')
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
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      // console.log(this.myPhoto);
        }, (err) => {
          console.log('ERROR -> ' + JSON.stringify(err));
    });  
  }

  upload(){
    this.storage.get('userID').then((val) => {
  
    });
  }

  getAmphoe(value: any)
  {
    this.provinceID = value;
    console.log(value);
    if(value != "")
    {
      this.http.post('http://192.168.2.165:8000/api/district', {
        prov_id: value,
      
      }, { Authorization: 'OAuth2: token' })
      .then(data => {
          if(data.status == 200)
          {
            this.arrAmphoe = JSON.parse(data.data);
            console.log('Success'); 
          }
          else{
            console.log('Data no Match'); 
          } 
        })
        .catch(error => {
          console.log(error.status);
        });
    }

  }

  getTambon(value: any)
  {
    this.amphoeID = value;
    console.log(value);
    if(value != "")
    {
      this.http.post('http://192.168.2.165:8000/api/subdist', {
        dist_id: value,
      
      }, { Authorization: 'OAuth2: token' })
      .then(data => {
          if(data.status == 200)
          {
            this.arrTambon = JSON.parse(data.data);
            console.log('Success'); 
          }
          else{
            console.log('Data no Match'); 
          } 
        })
        .catch(error => {
          console.log(error.status);
        });
    }
    
  }
  
}
