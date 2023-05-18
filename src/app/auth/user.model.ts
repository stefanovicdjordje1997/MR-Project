export class User {
  constructor(
    private id: string,
    private _token: string,
    private tokenExpirationDate: Date,
    private name: string,
    private surname: string,
    private birthDate: Date,
    private faculty: string,
    private phoneNumber: string,
    private email: string
  ) {
  }
  get token() {
    if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }
}


