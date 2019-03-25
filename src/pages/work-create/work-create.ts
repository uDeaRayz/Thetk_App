import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { WorkShowPage } from '../work-show/work-show';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


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
  // dist:any;
  provinceID: any;
  amphoeID: any;
  arrAmphoe: any;
  arrTambon: any;
  filePath: any;

  place_name = '';
  province = '';
  dist ='';
  subdist ='';
  detail = '';



  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private http: HTTP,
    private storage: Storage,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    ) {
  }

  ionViewDidLoad() {

    // Province
    this.http.get(this.authService.url+'api/province', {}, {})
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

  // ฟังก์ชันอำเภอ
  getAmphoe(value: any)
  {
    this.provinceID = value;
    console.log(value);
    if(value != "")
    {
      this.http.post(this.authService.url+'/api/district', {
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

  // ฟังก์ชันตำบล
  getTambon(value: any)
  {
    this.amphoeID = value;
    console.log(value);
    if(value != "")
    {
      this.http.post(this.authService.url+'/api/subdist', {
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

  // บันทึกข้อมูล
  workSubmit(){
    this.storage.get('userID').then((val) => {
      this.http.post(this.authService.url+'/api/add_work', {
      place_name: this.place_name,
      province: this.province,
      dist: this.dist,
      subdist: this.subdist,
      detail: this.detail,
      user_id: val,
      }, { Authorization: 'OAuth2: token' })
      .then(data => {   
        const alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'บันทึกสำเร็จ',
          buttons: [{
            text: 'OK',
            handler: () => {
              this.navCtrl.push(WorkShowPage);
            }
          }]
        });
        alert.present();
        console.log('data -> ' + data.data);
        
      })
      .catch(error => {
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
  
}
