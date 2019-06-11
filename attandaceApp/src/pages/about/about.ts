import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AttandenceDetailPage } from '../attandence-detail/attandence-detail';
import { StudentServiceProvider } from '../../providers/student-service/student-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  items = [ ];

  constructor(public navCtrl: NavController,  private stu: StudentServiceProvider) {

  }

  onSelect(item){
    this.navCtrl.push(AttandenceDetailPage,{item:item});
  }

  ionViewDidEnter(){
    this.stu.getLectures().subscribe(res => {
      this.items = res.lectures;
    }, err=> {

    })
  }

}
