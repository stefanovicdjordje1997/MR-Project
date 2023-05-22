import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from "@ionic/angular";
import {AddBookModalComponent} from "../../../components/add-book-modal/add-book-modal.component";
import {AuthService} from "../../../auth/auth.service";
import {Book} from "../../../book.model";
import {Subscription} from "rxjs";
import {BooksService} from "../../../services/books.service";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {
  books: Book[]
  private subscription: Subscription

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController, private authService: AuthService, private bookService: BooksService) {
  }

  ngOnInit() {

  }

  openAddForm() {
    this.modalCtrl.create({
      component: AddBookModalComponent
    }).then((modal) => {
      modal.canDismiss = async () => {
        const actionSheet = await this.actionSheetCtrl.create({
          header: 'Da li ste sigurni?',
          buttons: [
            {
              text: 'Da',
              role: 'confirm',
            },
            {
              text: 'Ne',
              role: 'cancel',
            },
          ],
        });

        await actionSheet.present();

        const {role} = await actionSheet.onWillDismiss();

        return role === 'confirm';
      };
      modal.present()

    })
  }

  ionViewWillEnter() {
    this.books = []
    this.bookService.getBooks().subscribe()
    this.bookService.books.subscribe((books) => {
      for(let id in books){
        if(books[id].userId == this.authService.user.id){
          this.books.push(books[id])
        }
      }
    })
  }

  ionViewWillDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
