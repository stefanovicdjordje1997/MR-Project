import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs";
import {User} from "./user.model";
import {UserService} from "../services/user.service";

interface AuthResponse {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

interface UserData {
  name: string,
  surname: string,
  birthDate: Date,
  faculty: string,
  phoneNumber: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _isUserAuthenticated = false
  user: User


  constructor(private http: HttpClient, private userService: UserService) {
  }

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true
    this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.APIKey}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(tap((userData) => {
      this.userService.getUsers().subscribe((users)=>{

        this.user = users.find((u) => u.id === userData.localId)
        const expirationTime = new Date(new Date().getTime() + +userData.expiresIn * 1000)
        if (this.user) {
          this.user._token = userData.idToken;
          this.user.tokenExpirationDate = expirationTime;
        }
        console.log(this.user.name)
      })
    })).subscribe()
  }

  logOut() {
    this._isUserAuthenticated = false
  }


  register(user: UserData) {
    return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKey}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(map((userData) => {
      const expirationTime = new Date(
        new Date().getTime() + +userData.expiresIn * 1000
      );
      this.user = new User(
        userData.localId,
        userData.idToken,
        expirationTime,
        user.name,
        user.surname,
        user.birthDate,
        user.faculty,
        user.phoneNumber,
        userData.email,
      )
      return this.user
    })).subscribe((user) => {
      this.userService.addUser(
        user.id,
        user.name,
        user.surname,
        user.birthDate,
        user.faculty,
        user.phoneNumber,
        user.email
      )
      console.log(user)
    })
  }


}
