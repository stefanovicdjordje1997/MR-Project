import { Injectable } from '@angular/core';
import { User } from "../auth/user.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, tap } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public _users = new BehaviorSubject<User[]>([]);
  token: string;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.tokenService.token.subscribe((token) => {
      this.token = token;
    });
  }

  addUser(
    name: string,
    surname: string,
    birthDate: Date,
    faculty: string,
    phoneNumber: string,
    email: string
  ) {
   return this.http
      .post(
        `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${this.token}`,
        {
          name,
          surname,
          birthDate,
          faculty,
          phoneNumber,
          email,
        }
      ).subscribe()
  }

  getUsers() {
    return this.http
      .get<{ [id: string]: User }>(
        `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${this.token}`
      )
      .pipe(
        map((userData) => {
          const users: User[] = [];
          for (const id in userData) {
            if (userData.hasOwnProperty(id)) {
              users.push(new User(
                id,
                null,
                null,
                userData[id].email,
                userData[id].name,
                userData[id].surname,
                userData[id].birthDate,
                userData[id].faculty,
                userData[id].phoneNumber,
                userData[id].favoriteBooks
              ))
            }
          }
          return users;
        }),
        tap((users) => {
          this._users.next(users)
        })
      );
  }

  updateUser(user: User) {
    return this.http.put(
      `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json?auth=${this.token}`,
      user
    );
  }
}
