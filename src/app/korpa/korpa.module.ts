import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KorpaPageRoutingModule } from './korpa-routing.module';

import { KorpaPage } from './korpa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KorpaPageRoutingModule
  ],
  declarations: [KorpaPage]
})
export class KorpaPageModule {}
