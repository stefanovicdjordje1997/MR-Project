import {Injectable} from '@angular/core';
import {Book} from "../book.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, switchMap, take, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private _books = new BehaviorSubject<Book[]>([])

  // oldBooks: Book[] = [{
  //   id: 'b1',
  //   name: 'Matematika 3',
  //   faculty: 'Fakultet organizacionih nauka',
  //   fieldOfStudy: 'Informacioni sistemi i tehnologije',
  //   yearOfStudy: 2,
  //   publicationYear: 2018,
  //   price: 600,
  //   used: true,
  //   damaged: false,
  //   imageUrl: ''
  // }, {
  //   id: 'b2',
  //   name: 'Osnovi organizacije',
  //   faculty: 'Fakultet organizacionih nauka',
  //   fieldOfStudy: 'Menadzment',
  //   yearOfStudy: 1,
  //   publicationYear: 2015,
  //   price: 900,
  //   used: false,
  //   damaged: false,
  //   imageUrl: 'https://id.fon.bg.ac.rs/uploads/documents/empire_plugin/61b65ed6ae0f0.jpeg'
  // }, {
  //   id: 'b3',
  //   name: 'Menadzment inovacija',
  //   faculty: 'Fakultet organizacionih nauka',
  //   fieldOfStudy: 'Operacioni enadzment',
  //   yearOfStudy: 1,
  //   publicationYear: 2013,
  //   price: 750,
  //   used: true,
  //   damaged: true,
  //   imageUrl: 'https://id.fon.bg.ac.rs/uploads/documents/empire_plugin/A0009%20Menad%C5%BEment%20inovacija%2Cinovacioni%20projekti%2Cmodeli%20i%20metodi.jpg'
  // }]

  constructor(private http: HttpClient) {
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
    return this.http.post<{ id: string }>('https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json', {
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
    return this.http.get<{ [id: string]: Book }>('https://book-app-db-default-rtdb.europe-west1.firebasedatabase.app/books.json').pipe(map((booksFromDb) => {
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
}
