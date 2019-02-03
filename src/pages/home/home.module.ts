import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ShrinkingSegmentHeaderComponent } from '../../components/shrinking-segment-header/shrinking-segment-header';
import { ExpandableHeaderComponent } from '../../components/expandable-header/expandable-header';

@NgModule({
  declarations: [
    HomePage,    
    ShrinkingSegmentHeaderComponent,
    ExpandableHeaderComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
