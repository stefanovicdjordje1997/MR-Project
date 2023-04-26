import {Component, Input, OnInit} from '@angular/core';
import {Book} from "../../book.model";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent  implements OnInit {
   @Input() book: Book={
    id: 'b1',
    name: 'Matematika 3',
    faculty: 'Fakultet organizacionih nauka',
    fieldOfStudy: 'Informacioni sistemi i tehnologije',
    yearOfStudy: 2,
    publicationYear: 2018,
    price:600,
    used: true,
    damaged: false,
    imageUrl:'https://id.fon.bg.ac.rs/uploads/documents/empire_plugin/A0027%20Matematika%203.jpg'
  }

  expand = false
  constructor() { }

  ngOnInit() {}

}
