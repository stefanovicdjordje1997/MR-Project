import { Injectable } from '@angular/core';
import {Book} from "../book.model";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [{
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
  },{
    id: 'b2',
    name: 'Osnovi organizacije',
    faculty: 'Fakultet organizacionih nauka',
    fieldOfStudy: 'Menadzment',
    yearOfStudy: 1,
    publicationYear: 2015,
    price:900,
    used: false,
    damaged: false,
    imageUrl:'https://id.fon.bg.ac.rs/uploads/documents/empire_plugin/61b65ed6ae0f0.jpeg'
  },{
    id: 'b3',
    name: 'Menadzment inovacija',
    faculty: 'Fakultet organizacionih nauka',
    fieldOfStudy: 'Operacioni enadzment',
    yearOfStudy: 1,
    publicationYear: 2013,
    price:750,
    used: true,
    damaged: true,
    imageUrl:'https://id.fon.bg.ac.rs/uploads/documents/empire_plugin/A0009%20Menad%C5%BEment%20inovacija%2Cinovacioni%20projekti%2Cmodeli%20i%20metodi.jpg'
  }]
  constructor() { }
}
