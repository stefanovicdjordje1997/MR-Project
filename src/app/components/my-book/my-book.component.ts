import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../book.model";

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.scss'],
})
export class MyBookComponent  implements OnInit {

  @Input() book: Book

  expand = false

  constructor() {
  }

  ngOnInit() {
  }

}
