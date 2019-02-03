import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WallettransactionsPage } from './wallettransactions';

@NgModule({
  declarations: [
    WallettransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(WallettransactionsPage),
  ],
})
export class WallettransactionsPageModule {}
