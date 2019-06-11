import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateLectureCodePage } from './create-lecture-code';

@NgModule({
  declarations: [
    CreateLectureCodePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateLectureCodePage),
  ],
})
export class CreateLectureCodePageModule {}
