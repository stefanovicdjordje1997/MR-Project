import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../book.model";
import {ModalController} from "@ionic/angular";
import {AddBookModalComponent} from "../add-book-modal/add-book-modal.component";
import {BooksService} from "../../services/books.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.scss'],
})
export class MyBookComponent  implements OnInit {

  @Input() book: Book
  @Output() deletedBook: EventEmitter<string> = new EventEmitter<string>()

  expand = false

  constructor(private modalCtrl: ModalController, private bookService: BooksService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  async openEditForm() {
    if(this.authService.user.id === this.book.userId){
      const modal = await this.modalCtrl.create({
        component: AddBookModalComponent,
        componentProps: {
          book: this.book
        }
      });
      await modal.present();
    }else {
      console.log(`User${this.authService.user.name} is not authorised to edit this book.`)
    }
  }


  onDelete() {
    console.log('Delete button clicked!')
    if(this.authService.user.id === this.book.userId){
      console.log(`User ${this.authService.user.name} is authorised to delte book ${this.book.name}`)
      this.bookService.deleteBook(this.book.id).subscribe()
      this.deletedBook.emit(this.book.name)
    }
    else {
      console.log(`User${this.authService.user.name} is not authorised to delete this book.`)
    }
  }
}
