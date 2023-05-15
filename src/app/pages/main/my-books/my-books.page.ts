import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ModalController} from "@ionic/angular";
import {AddBookModalComponent} from "../../../components/add-book-modal/add-book-modal.component";

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.page.html',
  styleUrls: ['./my-books.page.scss'],
})
export class MyBooksPage implements OnInit {

  constructor(private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) {
  }

  ngOnInit() {
  }

  openAddForm() {
    this.modalCtrl.create({
      component: AddBookModalComponent
    }).then((modal) => {
      modal.canDismiss = async () => {
        const actionSheet = await this.actionSheetCtrl.create({
          header: 'Da li ste sigurni?',
          buttons: [
            {
              text: 'Da',
              role: 'confirm',
            },
            {
              text: 'Ne',
              role: 'cancel',
            },
          ],
        });

        await actionSheet.present();

        const {role} = await actionSheet.onWillDismiss();

        return role === 'confirm';
      };
      modal.present()

    })
  }
  closeAddForm(){
    this.modalCtrl.dismiss();
  }

}
