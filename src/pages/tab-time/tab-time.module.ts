import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabTimePage } from './tab-time';

@NgModule({
  declarations: [
    TabTimePage,
  ],
  imports: [
    IonicPageModule.forChild(TabTimePage),
  ],
})
export class TabTimePageModule {}
