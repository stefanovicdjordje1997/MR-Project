export interface Book {
  // Treba da se doda autor oglasa tj onaj ko je okacio oglas
  id: string
  imageUrl: string
  name: string
  //moze i autor ali da ne komplikujemo
  faculty: string
  fieldOfStudy: string
  yearOfStudy: number
  publicationYear: number
  price: number
  used: boolean
  damaged: boolean
}
