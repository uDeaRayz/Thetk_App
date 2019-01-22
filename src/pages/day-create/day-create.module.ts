import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayCreatePage } from './day-create';

@NgModule({
  declarations: [
    DayCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DayCreatePage),
  ],
})
export class DayCreatePageModule {}
