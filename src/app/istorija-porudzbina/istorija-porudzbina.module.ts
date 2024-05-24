import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IstorijaPorudzbinaPageRoutingModule } from './istorija-porudzbina-routing.module';

import { IstorijaPorudzbinaPage } from './istorija-porudzbina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IstorijaPorudzbinaPageRoutingModule
  ],
  declarations: [IstorijaPorudzbinaPage]
})
export class IstorijaPorudzbinaPageModule {}
