import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Book} from "../../book.model"
import {AlertController, ModalController} from "@ionic/angular"
import {AddBookModalComponent} from "../add-book-modal/add-book-modal.component"
import {BooksService} from "../../services/books.service"
import {AuthService} from "../../auth/auth.service"

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.scss'],
})
export class MyBookComponent implements OnInit {

  @Input() book: Book
  @Output() deletedBook: EventEmitter<string> = new EventEmitter<string>()

  expand = false

  constructor(private modalCtrl: ModalController, private bookService: BooksService, private authService: AuthService, private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  async openEditForm() {
    if (this.authService.user.id === this.book.userId) {
      const modal = await this.modalCtrl.create({
        component: AddBookModalComponent,
        componentProps: {
          book: this.book
        }
      })
      await modal.present()
    } else {
      console.log(`User${this.authService.user.name} is not authorised to edit this book.`)
    }
  }


  async onDelete() {
    if (this.authService.user.id === this.book.userId) {
      const alert = await this.alertCtrl.create({
        header: 'Upozorenje',
        message: `Da li ste sigurni da želite da ižbrišete udžbenik ${this.book.name}?`,
        buttons: [
          {
            text: 'Odustani',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Delete canceled')
            }
          },
          {
            text: 'Izbriši',
            handler: () => {
              this.bookService.deleteBook(this.book.id).subscribe(() => {
                this.deletedBook.emit(this.book.name)
                console.log(`Book ${this.book.name} deleted.`)
              })
            }
          }
        ]
      })

      await alert.present()
    } else {
      console.log(`User ${this.authService.user.name} is not authorized to delete this book.`)
    }
  }

}
