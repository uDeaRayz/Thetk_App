import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { DayShowPage } from '../day-show/day-show';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the DayCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-day-create',
  templateUrl: 'day-create.html',
  providers: [[Camera]]
})
export class DayCreatePage {

  jParse :any;
  leave:any;
  // ตัวแปร ของรูปภาพ
  leave_img: any;
  filePath: any;

  leave_id = '';
  type = '';
  date_start = '';
  date_end = '';
  detail = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HTTP,
    private storage: Storage,
    public alertCtrl: AlertController,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public authService: AuthServiceProvider,) {
  }


  ionViewDidLoad() {

    this.storage.get('userID').then((val) => {
      this.http.post(this.authService.url+'/api/amount', 
      { user_id: val }, {Authorization: 'OAuth2: token'})
      .then(data => {
        if(data.status == 200)
        {
          let jParse = JSON.parse(data.data);
          this.storage.set('leave', jParse)

          this.storage.get('leave').then((val) => {
            this.leave = val;
          });
          console.log(this.leave); 
        }
        else{
          console.log('Data no Match'); 
        }
      })
      .catch(error => {
        console.log(error.status);
      });
    });

    console.log('ionViewDidLoad DayCreatePage');
  }

  // ฟังก์ชันการถ่ายภาพ
  TakePhoto(pictureSourceType: any){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: pictureSourceType,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.leave_img = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          console.log('ERROR -> ' + JSON.stringify(err));
    });  
  }

  leave_submit(){
    let loader = this.loadingCtrl.create({
      content: "Saving..."
    });
    loader.present();

    this.storage.get('userID').then((val) => {
      this.http.uploadFile(this.authService.url+'/api/add_leave', {
      leave_id: this.leave_id,
      type: this.type,
      date_start: this.date_start,
      date_end: this.date_end,
      detail: this.detail,
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
              this.navCtrl.push(DayShowPage);
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

}
