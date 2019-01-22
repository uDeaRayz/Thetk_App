import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkShowPage } from './work-show';

@NgModule({
  declarations: [
    WorkShowPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkShowPage),
  ],
})
export class WorkShowPageModule {}
