import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EasyPage } from './easy';

@NgModule({
  declarations: [
    EasyPage,
  ],
  imports: [
    IonicPageModule.forChild(EasyPage),
  ],
})
export class EasyPageModule {}
