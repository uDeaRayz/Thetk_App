import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  url:String = 'http://192.168.2.165:8000/';
  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
