import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {User} from "../../user.model";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  logInForm: FormGroup
  users: User[]

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    })
  }
  ionViewWillEnter(){
    this.userService.getUsers().subscribe()
  }

  onLogin() {
    if (this.logInForm.valid) {
      this.authService.logIn(this.logInForm.value)
        .subscribe(
          {
            next: () => {
              this.router.navigateByUrl("/main");
            },
            error: async () => {
              let message = 'Email ili lozinka neispravni.';

              // const code = errRes.error.error.message;
              // if (code === 'EMAIL_NOT_FOUND') {
              //     message = 'Email address could not be found.';
              // } else if (code === 'INVALID_PASSWORD') {
              //     message = 'This password is not correct.';
              // }

              const alert = await this.alertCtrl.create(
                {
                  header: 'Greška!',
                  message,
                  buttons: ['Pokušaj ponovo']
                }
              );
              await alert.present();
              this.logInForm.reset();
            }
          }
        );
    }
  }
}
