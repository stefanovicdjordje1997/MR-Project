import {Component, OnInit} from '@angular/core'
import {AuthService} from "../../auth.service"
import {Router} from "@angular/router"
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {UserService} from "../../../services/user.service"
import {AlertController} from "@ionic/angular"

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  logInForm: FormGroup
  loggingIn = false

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onLogin() {
    this.loggingIn = true
    this.authService.logIn(this.logInForm.value)
      .subscribe(
        {
          next: () => {
            this.loggingIn = false
            this.router.navigateByUrl("/main")
          },
          error: async (error) => {
            let message = 'Nalog nedostupan'
            if (error.error.error.message === 'INVALID_PASSWORD') {
              message = 'Pogrešna lozinka'
            }
            if (error.error.error.message === 'EMAIL_NOT_FOUND') {
              message = 'Pogrešan email'
            }

            const alert = await this.alertCtrl.create(
              {
                header: 'Greška!',
                message,
                buttons: ['Pokušaj ponovo']
              }
            )
            await alert.present()
            this.logInForm.reset()
            this.loggingIn = false
          }
        }
      )
  }
}
