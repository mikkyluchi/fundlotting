import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MystockPage } from './mystock';

@NgModule({
  declarations: [
    MystockPage,
  ],
  imports: [
    IonicPageModule.forChild(MystockPage),
  ],
})
export class MystockPageModule {}
