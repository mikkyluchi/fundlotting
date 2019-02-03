import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinPage } from './pin';
import { IonDigitKeyboard } from '../../components/ion-digit-keyboard/ion-digit-keyboard.module';
@NgModule({
  declarations: [
    PinPage,
  ],
  imports: [
    IonDigitKeyboard,
    IonicPageModule.forChild(PinPage),
  ],
})
export class PinPageModule {}
