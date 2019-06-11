import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnrollLecturePage } from './enroll-lecture';

@NgModule({
  declarations: [
    EnrollLecturePage,
  ],
  imports: [
    IonicPageModule.forChild(EnrollLecturePage),
  ],
})
export class EnrollLecturePageModule {}
