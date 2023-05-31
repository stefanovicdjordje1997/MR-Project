import {Injectable} from '@angular/core'
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _token = new BehaviorSubject<string>(null)

  constructor() {
  }

  get token() {
    return this._token.asObservable()
  }

  setToken(token: string) {
    this._token.next(token)
  }
}
