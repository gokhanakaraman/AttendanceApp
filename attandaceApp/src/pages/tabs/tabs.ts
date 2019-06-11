import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AddLecturePage } from '../add-lecture/add-lecture';
import { AppConstants } from '../../app/variables';
import { StudentApproveListPage } from '../student-approve-list/student-approve-list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = AddLecturePage;
  tab5Root = StudentApproveListPage;
  isAdmin = AppConstants.isAdmin;

  constructor() {

  }
}
