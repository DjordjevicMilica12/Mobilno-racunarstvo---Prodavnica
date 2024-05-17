import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KorpaPage } from './korpa.page';

const routes: Routes = [
  {
    path: '',
    component: KorpaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KorpaPageRoutingModule {}
