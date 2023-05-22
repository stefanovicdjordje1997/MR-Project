import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { User } from './user.model';
import { UserService } from '../services/user.service';
import { BehaviorSubject } from 'rxjs';

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
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private userService: UserService) {}

  get isUserAuthenticated(): boolean {
    return this._isUserAuthenticated;
  }

  get user(): User {
    return this._user.value;
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
          this.userService.getUsers().subscribe((users) => {
            this._user.next(
              users.find((u) => u.id === userData.localId)
            );
            const expirationTime = new Date(
              new Date().getTime() + +userData.expiresIn * 1000
            );
            if (this.user) {
              this.user._token = userData.idToken;
              this.user.tokenExpirationDate = expirationTime;
            }
            console.log(this.user?.name);
          });
        })
      )
  }

  logOut() {
    this._isUserAuthenticated = false;
    this._user.next(null);
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
          );
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
      .subscribe((user) => {
        this.userService.addUser(
          user.id,
          user.name,
          user.surname,
          user.birthDate,
          user.faculty,
          user.phoneNumber,
          user.email
        );
        console.log(user);
      });
  }
}
