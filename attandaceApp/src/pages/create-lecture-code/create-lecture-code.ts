import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { StudentServiceProvider } from '../../providers/student-service/student-service';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

/**
 * Generated class for the CreateLectureCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-lecture-code',
  templateUrl: 'create-lecture-code.html',
})
export class CreateLectureCodePage {

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
    if(this.lecture.end>crntTime && this.lecture.start<crntTime){
      this.code=this.lecture.code;
    }
    
    console.log('CElala',this.lecture)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateLectureCodePage');
  }

  genCode() {
    let load1 = this.loadingCntrl.create({
      content: 'Konumuza Erişiliyor Lütfen Bekleyiniz!'
    })
    load1.present();

    this.geolocation.getCurrentPosition(this.geoOptions).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      load1.dismiss();
      let load2= this.loadingCntrl.create({
        content: 'Ders Kodu Üretiliyor Lütfen Bekleyiniz!'
      })
      console.log(resp);
      let data = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      }

      this.stu.genCode(this.lectureId, this.lectureCode, data).subscribe(res => {
        this.code = res.lecture.code;
        load2.dismiss();
      }, err => {
        load2.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Ders Kodu üretilirken bir hata oluştu Lütfen Girdiğiniz bilgileri Kontrol Ediniz!',
          duration: 2000,
        });
        toast.present();
      })
    }).catch((error) => {
      load1.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Konum Verilerinize Erişilemiyor. Lütfen Konum Servisinizin Açık Olduğundan Emin Olunuz!',
        duration: 2000,
      });
      toast.present();
      console.log('Error getting location', error);
    });

  }

}
