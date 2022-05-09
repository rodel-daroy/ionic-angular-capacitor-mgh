import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ManagePlanPage} from '../manage-plan/manage-plan.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private modalController: ModalController) {
  }


  async managePlan() {
    const modal = await this.modalController.create({
      component: ManagePlanPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
  }
}
