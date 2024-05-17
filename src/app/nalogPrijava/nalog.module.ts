import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NalogPageRoutingModule } from './nalog-routing.module';

import { NalogPage } from './nalog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NalogPageRoutingModule
  ],
  declarations: [NalogPage]
})
export class NalogPageModule {}
