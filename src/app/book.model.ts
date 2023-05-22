export class Book {

  id: string
  imageUrl: string
  userId: string
  name: string
  //moze i autor ali da ne komplikujemo
  faculty: string
  fieldOfStudy: string
  yearOfStudy: number
  publicationYear: number
  price: number
  used: boolean
  damaged: boolean

  constructor(
    id: string,
    imageUrl: string,
    name: string,
    faculty: string,
    fieldOfStudy: string,
    yearOfStudy: number,
    publicationYear: number,
    price: number,
    used: boolean,
    damaged: boolean
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.name = name;
    this.faculty = faculty;
    this.fieldOfStudy = fieldOfStudy;
    this.yearOfStudy = yearOfStudy;
    this.publicationYear = publicationYear;
    this.price = price;
    this.used = used;
    this.damaged = damaged;
  }
}

