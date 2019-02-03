import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankinformationPage } from './bankinformation';

@NgModule({
  declarations: [
    BankinformationPage,
  ],
  imports: [
    IonicPageModule.forChild(BankinformationPage),
  ],
})
export class BankinformationPageModule {}
