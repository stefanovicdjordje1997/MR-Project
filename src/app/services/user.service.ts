import {Injectable} from '@angular/core';
import {User} from "../auth/user.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _users: User[]
  constructor(private http: HttpClient) {
  }
  get users(){
    return this._users
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
    this.http.post('https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users.json', {
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
    return this.http.get<{ [id: string]: User }>('https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users.json').pipe(map((userData) => {
      const users: User[] = []
      for (const id in userData){
        if(userData.hasOwnProperty(id)){
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
          })
        }
      }
      return users
    })).subscribe((users)=>{
      this._users = users
    })
  }
}
