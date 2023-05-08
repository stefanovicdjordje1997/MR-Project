import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  logInForm: FormGroup

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      email: new FormControl('Unesite emal',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }

  onLogin() {
    this.authService.logIn()
    this.router.navigateByUrl('/main')
  }
}
