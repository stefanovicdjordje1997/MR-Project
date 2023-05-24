import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = this.authService.user
  name = this.user.name
  surname = this.user.surname
  faculty = this.user.faculty
  phoneNumber = this.user.phoneNumber
  email = this.user.email
  birthDate = new Date(this.user.birthDate)
  day = this.birthDate.getDate()
  month = this.birthDate.getMonth() + 1
  year = this.birthDate.getFullYear()

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


}
