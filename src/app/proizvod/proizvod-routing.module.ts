import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProizvodPage } from './proizvod.page';

const routes: Routes = [
  {
    path: '',
    component: ProizvodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProizvodPageRoutingModule {}
