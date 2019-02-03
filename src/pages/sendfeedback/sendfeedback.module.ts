import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendfeedbackPage } from './sendfeedback';

@NgModule({
  declarations: [
    SendfeedbackPage,
  ],
  imports: [
    IonicPageModule.forChild(SendfeedbackPage),
  ],
})
export class SendfeedbackPageModule {}
