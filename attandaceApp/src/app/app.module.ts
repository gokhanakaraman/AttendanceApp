import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ToastController, AlertController } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AttandenceDetailPage } from '../pages/attandence-detail/attandence-detail';
import { AuthenticatedHttpService, AuthenticatedHttpServiceFactory } from '../providers/auth-service/auth-service';
import { StudentServiceProvider } from '../providers/student-service/student-service';
import { XHRBackend, RequestOptions, HttpModule, Http } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { SignupPage } from '../pages/signup/signup';
import { AddLecturePage } from '../pages/add-lecture/add-lecture';
import { CreateLectureCodePage } from '../pages/create-lecture-code/create-lecture-code';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { EnrollLecturePage } from '../pages/enroll-lecture/enroll-lecture';
import { Push } from '@ionic-native/push';
import { IonicStorageModule } from '@ionic/storage';
import { StudentApproveListPage } from '../pages/student-approve-list/student-approve-list';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AttandenceDetailPage,
    SignupPage,
    AddLecturePage,
    CreateLectureCodePage,
    EnrollLecturePage,
    StudentApproveListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AttandenceDetailPage,
    SignupPage,
    AddLecturePage,
    CreateLectureCodePage,
    EnrollLecturePage,
    StudentApproveListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: AuthenticatedHttpService,
      useFactory: AuthenticatedHttpServiceFactory,
      deps: [XHRBackend, RequestOptions]
    },
    StudentServiceProvider,
    Geolocation,
    ToastController,
    AlertController,
    Push
  ]
})
export class AppModule {}
