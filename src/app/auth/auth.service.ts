import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _isUserAuthenticated = false;
  //vratiti na false
  private _isUserAuthenticated = true;

  constructor() { }

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated;
  }

  login(){
   this._isUserAuthenticated = true;
  }
  logOut(){
    this._isUserAuthenticated = false;
  }
}
