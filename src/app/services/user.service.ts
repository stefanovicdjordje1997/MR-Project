import {Injectable} from '@angular/core';
import {User} from "../auth/user.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, tap} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public _users = new BehaviorSubject<User[]>([])
  token: string

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.tokenService.token.subscribe((token) => {
      this.token = token
    });
  }

  addUser(
    id: string,
    name: string,
    surname: string,
    birthDate: Date,
    faculty: string,
    phoneNumber: string,
    email: string
  ) {
    this.http.post(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${this.token}`, {
      id,
      name,
      surname,
      birthDate,
      faculty,
      phoneNumber,
      email
    }).subscribe()
  }

  getUsers() {
    return this.http.get<{ [id: string]: User }>(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${this.token}`)
      .pipe(
        map(userData => {
          const users: User[] = [];
          for (const id in userData) {
            if (userData.hasOwnProperty(id)) {
              users.push({
                id: userData[id].id,
                _token: null,
                tokenExpirationDate: null,
                name: userData[id].name,
                surname: userData[id].surname,
                birthDate: userData[id].birthDate,
                faculty: userData[id].faculty,
                phoneNumber: userData[id].phoneNumber,
                email: userData[id].email,
                token: null
              });
            }
          }
          return users;
        }),
        tap(users => this._users.next(users))
      );
  }
}
