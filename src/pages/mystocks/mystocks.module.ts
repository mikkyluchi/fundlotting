import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MystocksPage } from './mystocks';

@NgModule({
  declarations: [
    MystocksPage,
  ],
  imports: [
    IonicPageModule.forChild(MystocksPage),
  ],
})
export class MystocksPageModule {}
