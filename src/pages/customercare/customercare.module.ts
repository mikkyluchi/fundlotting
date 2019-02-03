import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomercarePage } from './customercare';

@NgModule({
  declarations: [
    CustomercarePage,
  ],
  imports: [
    IonicPageModule.forChild(CustomercarePage),
  ],
})
export class CustomercarePageModule {}
