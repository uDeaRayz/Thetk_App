import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeOutPage } from './time-out';

@NgModule({
  declarations: [
    TimeOutPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeOutPage),
  ],
})
export class TimeOutPageModule {}
