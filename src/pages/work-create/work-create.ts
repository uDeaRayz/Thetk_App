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

  // ตัวแปร ของรูปภาพ
  myPhoto: any;

  // ตัวแปร เกี่ยวกับการเชื่อมต่อฐานข้อมูล
  responseData: any;
  headers: any;
  userData = {"username": "","password": "", "name": "","email": ""};


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

  // ตัวอย่างของฟังก์ชันเชื่อมต่อข้อมูล
  // Get data
  // testGet() {
  //   this.http.get('http://192.168.2.165:8000/api/data/get', {}, {})
  //   .then((data) => {
  //       console.log(JSON.stringify(data));
  //   })
  //   .catch((error) => {
  //       console.log(JSON.stringify(error));
  //   });
  // }

  // Post data
  // testPost() {
  //   const  myform = new FormData();
  //   myform.append('action', 'ionic');
  //   myform.append('password', 'ionic1');
    

  //   // let data = {
  //   //     'Action': 'Login',
  //   //     'UserName': 'bla',
  //   //     'Password': 'blabla'
  //   // };
  //   let headers = {
  //       // 'Content-Type': 'application/json'
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //   };

  //   let body = 'action=gggg'; 

  //   // this.http.post('http://192.168.2.131/api/testpost', body, headers)
  //   // .then((data) => {
  //   //     console.log(data);
  //   // })
  //   // .catch((error) => {
  //   //     console.log(JSON.stringify(error));
  //   // });
  // }

 
  testPost(){
    this.http.post('http://192.168.2.131/api/testpost', {
      action: 12,
      message: 'test'
    }, { Authorization: 'OAuth2: token' })
    .then(data => {

      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);

    })
    .catch(error => {

      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);

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
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          console.log('ERROR -> ' + JSON.stringify(err));
    });  
  }
}
