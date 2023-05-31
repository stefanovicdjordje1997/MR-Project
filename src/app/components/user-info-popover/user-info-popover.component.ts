import {Component, Input, OnInit} from '@angular/core'
import {User} from "../../auth/user.model"

@Component({
  selector: 'app-user-info-popover',
  templateUrl: './user-info-popover.component.html',
  styleUrls: ['./user-info-popover.component.scss'],
})
export class UserInfoPopoverComponent  implements OnInit {
  @Input() user: User
  constructor() { }

  ngOnInit() {}

}
