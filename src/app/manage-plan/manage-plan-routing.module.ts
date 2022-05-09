import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagePlanPage } from './manage-plan.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePlanPage
  },
  // {
  //   path: 'partners',
  //   loadChildren: () => import('./partners/partners.module').then( m => m.PartnersPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagePlanPageRoutingModule {}
