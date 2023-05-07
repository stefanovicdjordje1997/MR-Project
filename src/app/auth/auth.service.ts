import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false

  get isUserAuthenticated(): boolean{
    return this._isUserAuthenticated
  }
  logIn(){
    this._isUserAuthenticated = true
  }
  logOut(){
    this._isUserAuthenticated = false
  }

  constructor() { }
}
