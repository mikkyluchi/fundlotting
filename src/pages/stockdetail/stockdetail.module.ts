import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockdetailPage } from './stockdetail';

@NgModule({
  declarations: [
    StockdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StockdetailPage),
  ],
})
export class StockdetailPageModule {}
