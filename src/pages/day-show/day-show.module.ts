import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayShowPage } from './day-show';

@NgModule({
  declarations: [
    DayShowPage,
  ],
  imports: [
    IonicPageModule.forChild(DayShowPage),
  ],
})
export class DayShowPageModule {}
