import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockdetailsPage } from './stockdetails';

@NgModule({
  declarations: [
    StockdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(StockdetailsPage),
  ],
})
export class StockdetailsPageModule {}
