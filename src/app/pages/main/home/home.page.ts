import { Component, OnInit } from '@angular/core';
import {Book} from "../../../book.model";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: Book[]

  constructor(private bookService: BooksService) {
    //this.books = this.bookService.books;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.bookService.getBooks().subscribe((books)=>{
      this.books = books
    })
  }

}
