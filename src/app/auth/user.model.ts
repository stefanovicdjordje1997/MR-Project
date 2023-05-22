export class User {
  constructor(
    public id: string,
    public _token: string,
    public tokenExpirationDate: Date,
    public name: string,
    public surname: string,
    public birthDate: Date,
    public faculty: string,
    public phoneNumber: string,
    public email: string
  ) {
  }
  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }
}


