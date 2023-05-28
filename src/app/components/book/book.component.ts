import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../book.model';
import {UserService} from '../../services/user.service';
import {User} from '../../auth/user.model';
import {PopoverController} from "@ionic/angular";
import {UserInfoPopoverComponent} from "../user-info-popover/user-info-popover.component";
import {AuthService} from "../../auth/auth.service";
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() addToFavorites: EventEmitter<{ bookName: string, favorite: boolean }> = new EventEmitter<{ bookName: string, favorite: boolean }>()

  users: User[] = [];
  user: User
  expand = false;
  isBookMine = false
  favorite = false

  constructor(private userService: UserService, private popoverController: PopoverController, private bookService: BooksService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users
      this.user = this.users.find((u) => u.id === this.book.userId)
      if(this.authService.user.id === this.user.id){
        this.isBookMine = true
      }
      if(this.authService.user.favoriteBooks != undefined){
        this.favorite = !!this.authService.user.favoriteBooks.find((book) => book.id === this.book.id)
      }else{
        this.favorite = false
      }
    })
  }

  addToFavoritesClicked() {
    this.favorite = !this.favorite
    const event = {
      bookName: this.book.name,
      favorite: this.favorite
    }
    if(this.authService.user.favoriteBooks === undefined){
      this.bookService.addToFavorites(this.authService.user,this.book).subscribe()
      return
    }
    if(!this.authService.user.favoriteBooks.find((book)=>book.id === this.book.id || this.authService.user.favoriteBooks.length<=0)){
      this.bookService.addToFavorites(this.authService.user,this.book).subscribe()
    }else{
      this.bookService.removeFromFavorites(this.authService.user,this.book).subscribe()
    }
    this.addToFavorites.emit(event);
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
