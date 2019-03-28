import { Component } from '@angular/core';
import { EasyPage } from '../easy/easy';
import { MiddlePage } from '../middle/middle';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  easyPageL = EasyPage;
  middlePageL = MiddlePage;
}
