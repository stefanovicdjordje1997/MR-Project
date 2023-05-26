import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { User } from './user.model';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from "../services/token.service";

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface UserData {
  name: string;
  surname: string;
  birthDate: Date;
  faculty: string;
  phoneNumber: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isUserAuthenticated = false;
  public _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private tokenService: TokenService, private userService: UserService) {
  }

  get isUserAuthenticated() {
    return this._user.asObservable().pipe(map((user) => {
      if (user) {
        return !!this.user.token
      } else {
        return false
      }
    }))
  }

  get user(): User {
    return this._user.value;
  }

  get token() {
    return this.tokenService.token;
  }

  logIn(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.APIKey}`,
        {
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          );
          this.tokenService.setToken(userData.idToken);
          const loggedInUser = new User(
            userData.localId,
            userData.idToken,
            expirationTime
          );
          this._user.next(loggedInUser);
          this.completeUserData(); // Complete user data here
          console.log(this.user?.id + ' logged in.');
        })
      );
  }


  logOut() {
    this._isUserAuthenticated = false;
    this._user.next(null)
  }

  register(user: UserData) {
    return this.http
      .post<AuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.APIKey}`,
        {
          email: user.email,
          password: user.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        map((userData) => {
          const expirationTime = new Date(
            new Date().getTime() + +userData.expiresIn * 1000
          )
          this.tokenService.setToken(userData.idToken);
          const newUser = new User(
            userData.localId,
            userData.idToken,
            expirationTime,
            user.name,
            user.surname,
            user.birthDate,
            user.faculty,
            user.phoneNumber,
            userData.email
          );
          this._user.next(newUser);
          return newUser;
        })
      )
  }

  completeUserData() {
    if (this._user.value && this._user.value.id) {
      const userId = this._user.value.id;
      this.userService.getUsers().subscribe((users) => {
        const userFromDb = users.find((user) => user.id === userId);
        if (userFromDb) {
          const updatedUser: User = {
            ...this._user.value,
            token: this._user.value.token,
            name: userFromDb.name || this._user.value.name,
            surname: userFromDb.surname || this._user.value.surname,
            birthDate: userFromDb.birthDate || this._user.value.birthDate,
            faculty: userFromDb.faculty || this._user.value.faculty,
            phoneNumber: userFromDb.phoneNumber || this._user.value.phoneNumber,
            email: userFromDb.email || this._user.value.email,
          };
          this._user.next(updatedUser);
        }
      });
    }
  }

}
