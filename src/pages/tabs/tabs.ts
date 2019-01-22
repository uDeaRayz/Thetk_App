import { Component } from '@angular/core';

import { TabHomePage } from '../tab-home/tab-home';
import { TabTimePage } from '../tab-time/tab-time';
import { TabDayoffPage } from '../tab-dayoff/tab-dayoff';
import { TabWorkPage } from '../tab-work/tab-work';
import { TabEtcPage } from '../tab-etc/tab-etc';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TabHomePage;
  tab2Root = TabTimePage;
  tab3Root = TabWorkPage;
  tab4Root = TabDayoffPage;
  tab5Root = TabEtcPage;

  constructor() {

  }
}
