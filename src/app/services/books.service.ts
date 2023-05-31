import {Injectable} from '@angular/core'
import {Book} from "../book.model"
import {HttpClient} from "@angular/common/http"
import {BehaviorSubject, map, switchMap, take, tap} from "rxjs"
import {TokenService} from "./token.service"
import {User} from "../auth/user.model"
import {AuthService} from "../auth/auth.service"

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _books = new BehaviorSubject<Book[]>([])
  token: string

  constructor(private http: HttpClient, private tokenService: TokenService, private authService: AuthService) {
    this.tokenService.token.subscribe((token) => {
      this.token = token
    })
  }

  get books() {
    return this._books.asObservable()
  }

  addBook(
    imageUrl: string,
    userId: string,
    name: string,
    faculty: string,
    fieldOfStudy: string,
    yearOfStudy: number,
    publicationYear: number,
    price: number,
    used: boolean,
    damaged: boolean
  ) {
    let _id
    return this.http
      .post<{ name: string }>(
        `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.token}`,
        {
          imageUrl,
          userId,
          name,
          faculty,
          fieldOfStudy,
          yearOfStudy,
          publicationYear,
          price,
          used,
          damaged,
        }
      )
      .pipe(
        switchMap((bookFromDb) => {
          _id = bookFromDb.name
          return this.books
        }),
        take(1),
        tap((books) => {
          this._books.next(
            books.concat({
              id: _id,
              userId,
              imageUrl,
              name,
              faculty,
              fieldOfStudy,
              yearOfStudy,
              publicationYear,
              price,
              used,
              damaged,
            })
          )
        })
      )
  }

  getBooks() {
    return this.http
      .get<{ [id: string]: Book }>(
        `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.token}`
      )
      .pipe(
        map((booksFromDb) => {
          const books: Book[] = []
          for (const id in booksFromDb) {
            if (booksFromDb.hasOwnProperty(id)) {
              books.push({
                id: id,
                imageUrl: booksFromDb[id].imageUrl,
                userId: booksFromDb[id].userId,
                name: booksFromDb[id].name,
                faculty: booksFromDb[id].faculty,
                fieldOfStudy: booksFromDb[id].fieldOfStudy,
                yearOfStudy: booksFromDb[id].yearOfStudy,
                publicationYear: booksFromDb[id].publicationYear,
                price: booksFromDb[id].price,
                used: booksFromDb[id].used,
                damaged: booksFromDb[id].damaged,
              })
            }
          }
          return books
        }),
        tap((books) => {
          this._books.next(books)
        })
      )
  }

  addToFavorites(user: User, book: Book) {
    console.log('Add to favorites method called.')
    const updatedUser = {
      name: user.name,
      surname: user.surname,
      birthDate: user.birthDate,
      faculty: user.faculty,
      phoneNumber: user.phoneNumber,
      email: user.email,
      favoriteBooks: [...user.favoriteBooks || [], book]
    }
    return this.http.put<User>(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json?auth=${this.token}`, updatedUser)
      .pipe(
        tap((updatedUser) => {
          this.authService._user.next(new User(
            user.id,
            user._token,
            user.tokenExpirationDate,
            updatedUser.email,
            updatedUser.name,
            updatedUser.surname,
            updatedUser.birthDate,
            updatedUser.faculty,
            updatedUser.phoneNumber,
            updatedUser.favoriteBooks
          ))
          console.log(`Book '${book.name}' added to favorites for user '${user.name}'.`)
        })
      )
  }

  removeFromFavorites(user: User, book: Book) {
    const updatedUser = {
      name: user.name,
      surname: user.surname,
      birthDate: user.birthDate,
      faculty: user.faculty,
      phoneNumber: user.phoneNumber,
      email: user.email,
      favoriteBooks: user.favoriteBooks.filter((favoriteBook) => favoriteBook.id !== book.id)
    }
    return this.http.put<User>(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json?auth=${this.token}`, updatedUser)
      .pipe(
        tap((updatedUser) => {
          this.authService._user.next(new User(
            user.id,
            user._token,
            user.tokenExpirationDate,
            updatedUser.email,
            updatedUser.name,
            updatedUser.surname,
            updatedUser.birthDate,
            updatedUser.faculty,
            updatedUser.phoneNumber,
            updatedUser.favoriteBooks
          ))
        })
      )
  }

  editBook(
    bookId: string,
    userId: string,
    imageUrl: string,
    name: string,
    faculty: string,
    fieldOfStudy: string,
    yearOfStudy: number,
    publicationYear: number,
    price: number,
    used: boolean,
    damaged: boolean
  ) {
    const updatedBook: Book = {
      id: bookId,
      userId,
      imageUrl,
      name,
      faculty,
      fieldOfStudy,
      yearOfStudy,
      publicationYear,
      price,
      used,
      damaged
    }

    return this.http
      .put<Book>(
        `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json?auth=${this.token}`,
        updatedBook
      )
      .pipe(
        switchMap(() => this.books),
        take(1),
        tap((books) => {
          const updatedBooks = books.map((book) =>
            book.id === bookId ? updatedBook : book
          )
          this._books.next(updatedBooks)
        })
      )
  }

  deleteBook(bookId: string) {
    return this.http
      .delete(
        `https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books/${bookId}.json?auth=${this.token}`
      )
      .pipe(
        switchMap(() => this.books),
        take(1),
        tap((books) => {
          const updatedBooks = books.filter((book) => book.id !== bookId)
          this._books.next(updatedBooks)
        })
      )
  }

}
