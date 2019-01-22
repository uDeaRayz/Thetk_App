import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkCreatePage } from './work-create';

@NgModule({
  declarations: [
    WorkCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkCreatePage),
  ],
})
export class WorkCreatePageModule {}
