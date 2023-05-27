import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../book.model";

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.scss'],
})
export class MyBookComponent  implements OnInit {

  @Input() book: Book
  @Output() deletedBook: EventEmitter<string> = new EventEmitter<string>()

  expand = false

  constructor() {
  }

  ngOnInit() {
  }

  onEdit() {

  }

  onDelete() {
    this.deletedBook.emit(this.book.name)
    console.log(this.book.name)
  }
}
