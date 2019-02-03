import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdermenuPage } from './ordermenu';

@NgModule({
  declarations: [
    OrdermenuPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdermenuPage),
  ],
})
export class OrdermenuPageModule {}
