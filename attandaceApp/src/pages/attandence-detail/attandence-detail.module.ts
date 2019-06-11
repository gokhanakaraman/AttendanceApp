import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttandenceDetailPage } from './attandence-detail';

@NgModule({
  declarations: [
    AttandenceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttandenceDetailPage),
  ],
})
export class AttandenceDetailPageModule {}
