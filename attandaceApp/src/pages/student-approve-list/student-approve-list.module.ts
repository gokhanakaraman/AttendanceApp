import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentApproveListPage } from './student-approve-list';

@NgModule({
  declarations: [
    StudentApproveListPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentApproveListPage),
  ],
})
export class StudentApproveListPageModule {}
