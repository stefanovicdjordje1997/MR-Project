import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBooksPageRoutingModule } from './my-books-routing.module';

import { MyBooksPage } from './my-books.page';
import {AddBookModalComponent} from "../../../components/add-book-modal/add-book-modal.component";
import {MyBookComponent} from "../../../components/my-book/my-book.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyBooksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MyBooksPage,AddBookModalComponent, MyBookComponent]
})
export class MyBooksPageModule {}
