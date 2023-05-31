import {Component, OnInit} from '@angular/core'
import {Book} from "../../../book.model"
import {Subscription} from "rxjs"
import {BooksService} from "../../../services/books.service"
import {ToastController} from "@ionic/angular"
import {AuthService} from "../../../auth/auth.service"

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
      message: !event.favorite ? `Udzbenik ${event.bookName} uklonjen iz omiljenog` : `Udzbenik ${event.bookName} dodat u omiljeno`,
      duration: 3000
    })
    await toast.present()
  }

  constructor(private bookService: BooksService, private toastController: ToastController, private authService: AuthService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.books = []
    this.getFavoriteBooks()
  }

  ionViewWillDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getFavoriteBooks() {
    this.subscription = this.bookService.books.subscribe((books) => {
      for (const favBookId in this.authService.user.favoriteBooks) {
        if (books.find((b) => b.id === this.authService.user.favoriteBooks[favBookId].id)) {
          this.books.push(this.authService.user.favoriteBooks[favBookId])
        } else {
          this.bookService.removeFromFavorites(this.authService.user, this.authService.user.favoriteBooks[favBookId]).subscribe()
        }
      }
    })
  }
}
