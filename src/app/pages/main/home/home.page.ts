import {Component, OnInit} from '@angular/core';
import {Book} from "../../../book.model";
import {BooksService} from "../../../services/books.service";
import {Subscription} from "rxjs";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: Book[]
  private subscription: Subscription


  async showToast(event) {
    const toast = await this.toastController.create({
      message: !event.favorite?`Udzbenik ${event.bookName} uklonjen iz omiljenog`:`Udzbenik ${event.bookName} dodat u omiljeno`,
      duration: 3000
    });
    await toast.present();
  }
  constructor(private bookService: BooksService,private toastController: ToastController) {
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
