import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthoptionPage } from './authoption';

@NgModule({
  declarations: [
    AuthoptionPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthoptionPage),
  ],
})
export class AuthoptionPageModule {}
