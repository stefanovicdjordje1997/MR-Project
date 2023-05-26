import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../book.model';
import {UserService} from '../../services/user.service';
import {User} from '../../auth/user.model';
import {PopoverController} from "@ionic/angular";
import {UserInfoPopoverComponent} from "../user-info-popover/user-info-popover.component";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() addToFavorites: EventEmitter<string> = new EventEmitter<string>();

  users: User[] = [];
  user: User
  expand = false;

  constructor(private userService: UserService, private popoverController: PopoverController) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.user = this.users.find((u) => u.id === this.book.userId)
    });
  }

  addToFavoritesClicked() {
    this.addToFavorites.emit(this.book.name);
  }


  async presentPopover() {
    const popover = await this.popoverController.create({
      component: UserInfoPopoverComponent,
      componentProps: {
        user: this.user
      },
      translucent: true
    });
    return await popover.present();
  }
}
