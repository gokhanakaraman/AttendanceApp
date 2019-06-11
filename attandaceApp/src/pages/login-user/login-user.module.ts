import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginUserPage } from './login-user';

@NgModule({
  declarations: [
    LoginUserPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginUserPage),
  ],
})
export class LoginUserPageModule {}
