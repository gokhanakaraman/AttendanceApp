import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddLecturePage } from './add-lecture';

@NgModule({
  declarations: [
    AddLecturePage,
  ],
  imports: [
    IonicPageModule.forChild(AddLecturePage),
  ],
})
export class AddLecturePageModule {}
