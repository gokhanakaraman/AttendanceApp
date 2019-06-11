import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AttandenceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-attandence-detail',
  templateUrl: 'attandence-detail.html',
})
export class AttandenceDetailPage {

  item;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item=this.navParams.data.item;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttandenceDetailPage');
  }

}
