import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NalogRegistracijaPageRoutingModule } from './nalog-registracija-routing.module';

import { NalogRegistracijaPage } from './nalog-registracija.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NalogRegistracijaPageRoutingModule
  ],
  declarations: [NalogRegistracijaPage]
})
export class NalogRegistracijaPageModule {}
