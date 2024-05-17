import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProizvodPageRoutingModule } from './proizvod-routing.module';

import { ProizvodPage } from './proizvod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProizvodPageRoutingModule
  ],
  declarations: [ProizvodPage]
})
export class ProizvodPageModule {}
