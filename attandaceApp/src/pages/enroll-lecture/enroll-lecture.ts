import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { StudentServiceProvider } from '../../providers/student-service/student-service';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';

/**
 * Generated class for the EnrollLecturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enroll-lecture',
  templateUrl: 'enroll-lecture.html',
})
export class EnrollLecturePage {

  
  lectureId = null;
  lecture = null;

  lectureCode;

  code;

  geoOptions: GeolocationOptions = {
    enableHighAccuracy: true
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public stu: StudentServiceProvider, private geolocation: Geolocation,
    private toastCtrl: ToastController, private loadingCntrl: LoadingController) {
    this.lectureId = navParams.data.lecture.id;
    this.lecture = navParams.data.lecture;
    let crntDate = new Date();
    let crntTime = crntDate.toLocaleTimeString();
    console.log('Celal11', this.lecture, crntTime);
    if(!(this.lecture.end>crntTime && this.lecture.start<crntTime)){
      const toast = this.toastCtrl.create({
        message: 'Ders Saatlerinde Değilsiniz!',
        duration: 2000,
      });
      toast.present();
      this.navCtrl.setRoot(HomePage)
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateLectureCodePage');
  }

  genCode() {

    let loading = this.loadingCntrl.create({
      content: 'Lokasyon ve Ders Kodu Kontrol Ediliyor Lütfen Bekleyiniz!'
    });

    loading.present();

    this.geolocation.getCurrentPosition(this.geoOptions).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp);
      let data = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude,
        id: this.lectureId,
        userId: this.lecture.Users[0].id,
        code: this.lectureCode
      }

      this.stu.enroll(data).subscribe(res => {
        console.log('Celal123456',res)
        this.code = res.success;
        loading.dismiss();
      }, err => {
        loading.dismiss();
        this.code = err.success;
      })
    }).catch((error) => {
      loading.dismiss();
      console.log('Error getting location', error);
    });

  }

}
