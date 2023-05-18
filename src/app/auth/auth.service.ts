import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map, tap} from "rxjs";
import {User} from "./user.model";

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
  private user: User
  public users: User[]

  constructor(private http: HttpClient) {
  }

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated
  }

  logIn() {
    this._isUserAuthenticated = true
  }

  logOut() {
    this._isUserAuthenticated = false
  }


  register(user: UserData) {
   return this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKey}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(map((userData)=>{
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

   }))
  }


}
