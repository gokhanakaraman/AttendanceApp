import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { StudentServiceProvider } from '../../providers/student-service/student-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the AddLecturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-lecture',
  templateUrl: 'add-lecture.html',
})
export class AddLecturePage {

  lecture = { name: '', start: '', end: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCntrl: LoadingController, private stu: StudentServiceProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLecturePage');
  }

  create() {

    let load = this.loadingCntrl.create({
      content: 'Ders Oluşturuluyor Lütfen Bekleyini!'
    })

    load.present();
    this.stu.createLecture(this.lecture).subscribe(res => {
      load.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Ders Listenize Eklendi',
        duration: 2000,
      });
      toast.present();
      this.navCtrl.setRoot(HomePage);
    }, err => {
      const toast1 = this.toastCtrl.create({
        message: 'Ders Eklenirken Bir Hata Oluştu',
        duration: 2000,
      });
      toast1.present();

    })

  }

}
