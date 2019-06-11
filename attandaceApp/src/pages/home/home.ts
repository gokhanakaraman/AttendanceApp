import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StudentServiceProvider } from '../../providers/student-service/student-service';
import { AppConstants } from '../../app/variables';
import { CreateLectureCodePage } from '../create-lecture-code/create-lecture-code';
import { EnrollLecturePage } from '../enroll-lecture/enroll-lecture';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  ngOnInit(): void {
    
  }
  items = [
    /* {
      "etat": "Applications and Decisions Support Systems",
      "instructor": "Semih Utku",
      "slug": "absence-1-fevrier-2016",
      "state": "assertive",
      "horaires": {
        "from": "09:00",
        "to": "12:00"
      }
    },
    {
      "etat": "Introduction to Machine Learning",
      "instructor": "Zerrin Özer",
      "slug": "retard-30-janvier-2016",
      "state": "energized",
      "horaires": {
        "from": "13:00",
        "to": "15:00"
      }
    } */
  ];

  constructor(public navCtrl: NavController, private stu: StudentServiceProvider) {

  }

  ionViewDidLoad() {
    
  }

  onSelect(data){
    console.log('Cll', AppConstants.isAdmin);
    if(AppConstants.isAdmin){
      this.navCtrl.push(CreateLectureCodePage, {lecture: data});
    }else{
      this.navCtrl.push(EnrollLecturePage, {lecture: data});
    }

  }

  ionViewDidEnter(){
    this.stu.getLectures().subscribe(res => {
      this.items = res.lectures;
    }, err=> {

    })
  }

}
