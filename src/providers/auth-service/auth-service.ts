import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  isLoggedIn: Boolean;
  user: any;

  url: String = 'http://172.17.36.96:8000/';
  constructor(public http: HttpClient, public storage: Storage) {

    this.storage.get('userID').then((user) => {

      this.user = user;
      this.isLoggedIn = true;
    });

    console.log('Hello AuthServiceProvider Provider');
  }

  login(user) {

    return this.storage.set('userID', user).then(() => {
      this.isLoggedIn = true;
      this.user = user;
    });
  }
  logout() {

    this.storage.remove('userID').then(() => {
      this.isLoggedIn = false;
      this.user = null;
    });

  }
  isAuthenticated() {
    return this.isLoggedIn;
}
getUser() {
  return  this.storage.get('userID');
}
}
