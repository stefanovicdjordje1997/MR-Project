import {Component, OnInit} from '@angular/core';
import {Book} from "../../../book.model";
import {Subscription} from "rxjs";
import {BooksService} from "../../../services/books.service";
import {ToastController} from "@ionic/angular";
import {AuthService} from "../../../auth/auth.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  books: Book[] = []

  private subscription: Subscription


  async showToast(event) {
    const toast = await this.toastController.create({
      message: !event.favorite?`Udzbenik ${event.bookName} uklonjen iz omiljenog`:`Udzbenik ${event.bookName} dodat u omiljeno`,
      duration: 3000
    });
    await toast.present();
  }

  constructor(private bookService: BooksService, private toastController: ToastController, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.getUsers().subscribe()
    const favoriteBooks: Book[] = this.authService.user.favoriteBooks
    const userId = this.authService.user ? this.authService.user.id : null;
    if (userId) {
      this.books = [];
      for (const id in favoriteBooks) {
        this.books.push(favoriteBooks[id]);
      }
    }
  }

  ionViewWillDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
