import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup

  //HEADERS AND SUBHEADERS FOR DROPDOWN MENUS
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
  //ARRAYS WITH THE VALUES FOR DROPDOWN MENUS
  days = Array.from({length: 31}, (_, i) => i + 1)
  months = Array.from({length: 12}, (_, i) => i + 1)
  years = Array.from({length: 101}, (_, i) => i + 1930)
  faculties = ["Fakultet organizacionih nauka","Elektrotehnički fakultet"]
  constructor(private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      day: new FormControl('', Validators.required),
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      faculty: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rPassword: new FormControl('')
    })
    //CHECKING IF THE PASSWORD IS CHANGED, THEN APPLY VALIDATORS TO REPEATED PASSWORD
    this.signUpForm.get('password').valueChanges.subscribe((value) => {
      this.signUpForm.get('rPassword').setValidators(this.equalToValidator(value))
      this.signUpForm.get('rPassword').updateValueAndValidity()
    })
  }

  //FUNCTION THAT REPRESENTS THE EQUAL TO VALIDATOR
  equalToValidator(targetValue: string): ValidatorFn {
    return (control: FormControl): {[key: string]: any} | null => {
      const value = control.value
      const isValid = value === targetValue
      return isValid ? null : { equalTo: { value: targetValue } }
    }
  }

  onRegister() {
    this.router.navigateByUrl('/main')
  }
}
