import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NalogRegistracijaPage } from './nalog-registracija.page';

const routes: Routes = [
  {
    path: '',
    component: NalogRegistracijaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NalogRegistracijaPageRoutingModule {}
