import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeInPage } from './time-in';

@NgModule({
  declarations: [
    TimeInPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeInPage),
  ],
})
export class TimeInPageModule {}
