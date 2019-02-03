import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MystockdetailsPage } from './mystockdetails';

@NgModule({
  declarations: [
    MystockdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MystockdetailsPage),
  ],
})
export class MystockdetailsPageModule {}
