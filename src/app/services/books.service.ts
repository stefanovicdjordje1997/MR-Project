import {Injectable} from '@angular/core';
import {Book} from "../book.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, switchMap, take, tap} from "rxjs";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _books = new BehaviorSubject<Book[]>([])
  token: string

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.tokenService.token.subscribe((token) => {
      this.token = token;
    });
  }

  get books() {
    return this._books.asObservable()
  }

  addBook(imageUrl: string,
          userId: string,
          name: string,
          faculty: string,
          fieldOfStudy: string,
          yearOfStudy: number,
          publicationYear: number,
          price: number,
          used: boolean,
          damaged: boolean) {
    let _id
    return this.http.post<{ id: string }>(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.token}`, {
      imageUrl,
      userId,
      name,
      faculty,
      fieldOfStudy,
      yearOfStudy,
      publicationYear,
      price,
      used,
      damaged
    }).pipe(switchMap((bookFromDb) => {
      _id = bookFromDb.id
      return this.books
    }), take(1), tap((books) => {
      this._books.next(books.concat({
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
        damaged
      }))
    }))
  }
  getBooks() {
    return this.http.get<{ [id: string]: Book }>(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.token}`).pipe(map((booksFromDb) => {
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
            damaged: booksFromDb[id].damaged
          })
        }
      }
      return books
    }), tap(books => {
      this._books.next(books)
    }))

  }
  // getBooks() {
  //   return this.authService.token.pipe(
  //     take(1),
  //     switchMap((token)=>{
  //       return this.http.get<{ [id: string]: Book }>(`https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${this.token}`)
  //     }),
  //     map((booksFromDb) => {
  //       const books: Book[] = []
  //       for (const id in booksFromDb) {
  //         if (booksFromDb.hasOwnProperty(id)) {
  //           books.push({
  //             id: id,
  //             imageUrl: booksFromDb[id].imageUrl,
  //             userId: booksFromDb[id].userId,
  //             name: booksFromDb[id].name,
  //             faculty: booksFromDb[id].faculty,
  //             fieldOfStudy: booksFromDb[id].fieldOfStudy,
  //             yearOfStudy: booksFromDb[id].yearOfStudy,
  //             publicationYear: booksFromDb[id].publicationYear,
  //             price: booksFromDb[id].price,
  //             used: booksFromDb[id].used,
  //             damaged: booksFromDb[id].damaged
  //           })
  //         }
  //       }
  //       return books
  //     }),
  //     tap(books => {
  //       this._books.next(books)
  //     })
  //   )
  //
  //
  // }
}
