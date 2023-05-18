import {Component, OnInit} from '@angular/core';
import {Book} from "../../../book.model";
import {BooksService} from "../../../services/books.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: Book[]
  private subscription: Subscription

  constructor(private bookService: BooksService) {
  }

  ngOnInit() {
    this.bookService.books.subscribe((books) => {
      this.books = books
    })
  }

  ionViewWillEnter() {
    this.bookService.getBooks().subscribe()
  }

  ionViewWillDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
