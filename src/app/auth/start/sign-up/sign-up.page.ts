import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signUpForm: FormGroup
  registering = false

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
  years = Array.from({length: 101}, (_, i) => new Date().getFullYear() - i)
  faculties = ["Fakultet organizacionih nauka","Elektrotehnički fakultet"]
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

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
    this.registering = true
    this.authService.register({
      name: this.signUpForm.value.name,
      surname: this.signUpForm.value.surname,
      birthDate: new Date(this.signUpForm.value.year, this.signUpForm.value.month - 1, this.signUpForm.value.day),
      faculty: this.signUpForm.value.faculty,
      phoneNumber: this.signUpForm.value.phoneNumber,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }).subscribe((user) => {
      this.userService.addUser(
        user.name,
        user.surname,
        user.birthDate,
        user.faculty,
        user.phoneNumber,
        user.email
      )
      console.log('User '+user.name+' is registered.')
      this.registering = false
      this.router.navigateByUrl('/log-in')
    })

  }
}
