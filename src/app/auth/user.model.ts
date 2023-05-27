import { Book } from "../book.model";

export class User {
  constructor(
    public id: string,
    public _token: string,
    public tokenExpirationDate: Date,
    public email: string,
    public name: string = null,
    public surname: string = null,
    public birthDate: Date = null,
    public faculty: string = null,
    public phoneNumber: string = null,
    public favoriteBooks: Book[] = []
  ) {}

  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }
}
