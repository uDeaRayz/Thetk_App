import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DaynotPage } from './daynot';

@NgModule({
  declarations: [
    DaynotPage,
  ],
  imports: [
    IonicPageModule.forChild(DaynotPage),
  ],
})
export class DaynotPageModule {}
