import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  customActionSheetOptionsDay = {
    header: 'Dan rođenja',
    subHeader: 'Izaberite dan rođenja'
  }
  customActionSheetOptionsMonth = {
    header: 'Mesec rođenja',
    subHeader: 'Izaberite mesec rođenja'
  }
  customActionSheetOptionsYear = {
    header: 'Godina rođenja',
    subHeader: 'Izaberite godinu rođenja'
  }
  customActionSheetOptionsFaculty = {
    header: 'Fakultet',
    subHeader: 'Izaberite fakultet'
  }

  days = Array.from({length: 31}, (_, i) => i + 1);
  months = Array.from({length: 12}, (_, i) => i + 1);
  years = Array.from({length: 101}, (_, i) => i + 1930);
  faculties = ["Fakultet organizacionih nauka"]
  constructor() { }

  ngOnInit() {
  }

}
