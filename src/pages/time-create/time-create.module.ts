import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeCreatePage } from './time-create';

@NgModule({
  declarations: [
    TimeCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TimeCreatePage),
  ],
})
export class TimeCreatePageModule {}
