import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { StudentServiceProvider } from '../../providers/student-service/student-service';
import { AppConstants } from '../../app/variables';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isAdmin = false;

  registerCredentials = { number: '', password: '' };
  registerCredentialsUser = { email: '', password: '' };

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, private stu: StudentServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    AppConstants.isAdmin = this.isAdmin;
    if (!this.isAdmin) {

      this.stu.authenticate(this.registerCredentials.number, this.registerCredentials.password, AppConstants.device).subscribe(res => {
        AppConstants.appValues = res;
        let toast = this.toastCtrl.create({
          message: 'Giriş Başarılı Yönlendiriliyorsunuz',
          duration: 1000,
          position: 'bottom'
        });
        toast.present();

        this.navCtrl.setRoot(TabsPage)
      }, err => {
        let toast = this.toastCtrl.create({
          message: 'Kullanıcı adı yada Şifre Hatalı',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();

      })
    } else {
      this.stu.authenticateUser(this.registerCredentialsUser.email, this.registerCredentialsUser.password, AppConstants.device).subscribe(res => {
        AppConstants.appValues = res;
        let toast = this.toastCtrl.create({
          message: 'Giriş Başarılı Yönlendiriliyorsunuz',
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(TabsPage)
      }, err => {
        let toast = this.toastCtrl.create({
          message: 'Kullanıcı adı yada Şifre Hatalı',
          duration: 2000,
          position: 'bottom'
        });
        toast.present();

      })
    }

  }

  loginAsAdmin() {
    this.isAdmin = !this.isAdmin;
  }
  signUp() {
    this.navCtrl.push(SignupPage, { isAdmin: this.isAdmin });
  }

}
