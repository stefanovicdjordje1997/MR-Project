import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../book.model";
import {ModalController} from "@ionic/angular";
import {AddBookModalComponent} from "../add-book-modal/add-book-modal.component";

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.scss'],
})
export class MyBookComponent  implements OnInit {

  @Input() book: Book
  @Output() deletedBook: EventEmitter<string> = new EventEmitter<string>()

  expand = false

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  async openEditForm() {
    const modal = await this.modalCtrl.create({
      component: AddBookModalComponent,
      componentProps: {
        book: this.book
      }
    });
    await modal.present();
  }


  onDelete() {
    this.deletedBook.emit(this.book.name)
    console.log(this.book.name)
  }
}
