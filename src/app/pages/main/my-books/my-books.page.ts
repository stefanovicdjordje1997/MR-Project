import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AddBookModalComponent } from '../../../components/add-book-modal/add-book-modal.component';
import { AuthService } from '../../../auth/auth.service';
import { Book } from '../../../book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../../../services/books.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit, OnDestroy {
  books: Book[];
  private subscription: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private authService: AuthService,
    private bookService: BooksService
  ) {}

  ngOnInit() {}

  openAddForm() {
    this.modalCtrl.create({
      component: AddBookModalComponent,
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

        const { role } = await actionSheet.onWillDismiss();

        return role === 'confirm';
      };
      modal.present();
    });
  }

  ionViewWillEnter() {
    this.subscription = this.bookService.books.subscribe((books) => {
      const userId = this.authService.user ? this.authService.user.id : null;
      if (userId) {
        this.books = [];
        for (const id in books) {
          if (books[id].userId === userId) {
            this.books.push(books[id]);
          }
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
