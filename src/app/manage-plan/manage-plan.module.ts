import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagePlanPageRoutingModule } from './manage-plan-routing.module';

import { BrowserModule } from '@angular/platform-browser';

// import { IonicStorageModule } from '@ionic/storage';
// import { PartnersPage } from './partners/partners.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule,
    ManagePlanPageRoutingModule,
  ],
  declarations: [],
  exports: []
})
export class ManagePlanPageModule {}
