import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../book.model";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: Book

  expand = false

  constructor() {
  }

  ngOnInit() {
  }

}
