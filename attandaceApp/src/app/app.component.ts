import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from "@ionic-native/push";
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AppConstants } from './variables';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage, private push: Push, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initPushNotification();
    });
  }


  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    const options: PushOptions = {
      android: {
        senderID: '442983961142',
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };

    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications ->');
        } else {
          console.log('We do not have permission to send push notifications ->');
        }

      });

    const pushObject: PushObject = this.push.init(options);
    pushObject.on('registration').subscribe((data: any) => {
      console.log('device token 112 -> ' + data.registrationId);
      //TODO - send device token to server
      AppConstants.device=data.registrationId;
      this.storage.set('NotifyToken', data.registrationId);
    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + JSON.stringify(data));
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'bizitravel',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here
            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly
        /* this.nav.push(TravelListReviewPage, { travelId: 301, isInbox: true });
        */
        /* this.nav.push(TravelReviewComponent, {message: data.message}); */
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin -> ' + error));
  }
}
