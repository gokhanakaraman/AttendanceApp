import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StudentServiceProvider } from '../../providers/student-service/student-service';
import { AppConstants } from '../../app/variables';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  isAdmin = false;

  registerCredentials = { first: '', last: '', number: '', password: '' };
  registerCredentialsUser = { first: '', last: '', email: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, private stu: StudentServiceProvider, private toastCtrl: ToastController) {
    this.isAdmin = navParams.data.isAdmin;
    console.log(this.isAdmin);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  loginAsAdmin(){
    this.isAdmin=!this.isAdmin;
  }

  signUp(){
    AppConstants.isAdmin = this.isAdmin;
    if(!this.isAdmin){
      this.registerCredentials['status']=false;
      this.stu.signUp(this.registerCredentials).subscribe(res=>{
        AppConstants.appValues = res;
        let toast = this.toastCtrl.create({
          message: 'Kayıt Talebiniz Danışman Onayına Sunulmuştur',
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(TabsPage)

      }, err=>{

      })
    }else{
      this.stu.signUpUser(this.registerCredentialsUser).subscribe(res=>{
        AppConstants.appValues = res;
        let toast = this.toastCtrl.create({
          message: 'Kayıt İşlemi Başarılı',
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot(TabsPage)


      }, err=>{
        
      })
    }
    
  }

}
