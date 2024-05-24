import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IstorijaPorudzbinaPage } from './istorija-porudzbina.page';

const routes: Routes = [
  {
    path: '',
    component: IstorijaPorudzbinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IstorijaPorudzbinaPageRoutingModule {}
