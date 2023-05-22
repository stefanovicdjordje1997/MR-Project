import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss'],
})
export class AddBookModalComponent implements OnInit {
  addBookForm: FormGroup

  customActionSheetOptionsFaculty = {
    header: 'Fakultet',
    subHeader: 'Izaberite fakultet'
  }

  customActionSheetOptionsFieldOfStudy = {
    header: 'Smer',
    subHeader: 'Izaberite smer'
  }

  customActionSheetOptionsYearOfStudy = {
    header: 'Godina studija',
    subHeader: 'Izaberite godinu studija'
  }
  customActionSheetOptionsPublicationYear = {
    header: 'Godina izdanja',
    subHeader: 'Izaberite godinu izdanja'
  }

  faculties = ['Fakultet organizacionih nauka', 'Elektrotehnički fakultet', 'Mašinski fakultet']
  publicationYears = Array.from({length: 101}, (_, i) => i + 1930)
  fieldOfStudyByFaculty: { [faculty: string]: string[] } = {
    'Fakultet organizacionih nauka': ['Informacioni sistemi i tehnologije', 'Menadzment', 'Operacioni menadžment', 'Menadžment kvaliteta i standardizacija'],
    'Elektrotehnički fakultet': ['Smer 1', 'Smer 2'],
    'Mašinski fakultet': ['Smer 1', 'Smer 2', 'Smer 3']
  }
  yearsOfStudyByFaculty: { [faculty: string]: string[] } = {
    'Fakultet organizacionih nauka': ['1', '2', '3', '4'],
    'Elektrotehnički fakultet': ['1', '2', '3', '4'],
    'Mašinski fakultet': ['1', '2', '3', '4', '5']
  }


  constructor(private modalCtrl: ModalController,private actionSheetCtrl: ActionSheetController, private bookService: BooksService, private authService: AuthService) {
  }

  ngOnInit() {
    this.addBookForm = new FormGroup({
      faculty: new FormControl(null, Validators.required),
      fieldOfStudy: new FormControl({value: null, disabled: true}, Validators.required),
      name: new FormControl('', Validators.required),
      yearOfStudy: new FormControl({value: null, disabled: true}, Validators.required),
      publicationYear: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("[0-9]*$")]),
      used: new FormControl('', Validators.required),
      damaged: new FormControl('', Validators.required),
      imageUrl: new FormControl('')
    })

    this.addBookForm.get('faculty').valueChanges.subscribe(() => {
      this.addBookForm.get('fieldOfStudy').enable()
      this.addBookForm.get('yearOfStudy').enable()
    })

    this.addBookForm.get('used').valueChanges.subscribe((value: string) => {
      if (value === 'No') {
        this.addBookForm.get('damaged').setValue('No')
      } else {
        this.addBookForm.get('damaged').setValue('')
      }
    })

  }

  onCancel() {
    this.modalCtrl.dismiss()
  }


  onAddBook() {
    this.bookService.addBook(
      this.addBookForm.get('imageUrl').value,
      this.authService.user.id,
      this.addBookForm.get('name').value,
      this.addBookForm.get('faculty').value,
      this.addBookForm.get('fieldOfStudy').value,
      this.addBookForm.get('yearOfStudy').value,
      this.addBookForm.get('publicationYear').value,
      this.addBookForm.get('price').value,
      this.addBookForm.get('used').value != 'No',
      this.addBookForm.get('damaged').value != 'No'
    ).subscribe((id)=>{
      console.log(id)
    })
    this.onCancel()
  }
}
