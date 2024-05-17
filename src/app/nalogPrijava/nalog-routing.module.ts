import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NalogPage } from './nalog.page';

const routes: Routes = [
  {
    path: '',
    component: NalogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NalogPageRoutingModule {}
