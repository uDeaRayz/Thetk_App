import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeShowPage } from './time-show';

@NgModule({
  declarations: [
    TimeShowPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeShowPage),
  ],
})
export class TimeShowPageModule {}
