import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyloginPage } from './mylogin';

@NgModule({
  declarations: [
    MyloginPage,
  ],
  imports: [
    IonicPageModule.forChild(MyloginPage),
  ],
})
export class MyloginPageModule {}
