import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundwalletPage } from './fundwallet';
import { IonDigitKeyboard } from '../../components/ion-digit-keyboard/ion-digit-keyboard.module';
import { Angular4PaystackModule } from 'angular4-paystack';
@NgModule({
  declarations: [
    FundwalletPage,
  ],
  imports: [
    IonDigitKeyboard,
    Angular4PaystackModule,
    IonicPageModule.forChild(FundwalletPage),
  ],
})
export class FundwalletPageModule {}
