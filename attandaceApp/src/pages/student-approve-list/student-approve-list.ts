import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StudentServiceProvider } from '../../providers/student-service/student-service';

/**
 * Generated class for the StudentApproveListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-approve-list',
  templateUrl: 'student-approve-list.html',
})
export class StudentApproveListPage implements OnInit {

  students = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCntrl: LoadingController, private stu: StudentServiceProvider) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let loading = this.loadingCntrl.create({
      content: 'Lokasyon ve Ders Kodu Kontrol Ediliyor Lütfen Bekleyiniz!'
    });

    loading.present();
    this.stu.getApprove().subscribe(res => {
      console.log('Celal', res);
      this.students = res
      loading.dismiss();
    }, (err) => {
      loading.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentApproveListPage');

  }

  approve() {
    this.stu.setApprove().subscribe(res => {
      console.log(res);
    })
  }

}
