import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WorkoutPage } from '../pages/workout/workout';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PrivacyPage } from '../pages/privacy/privacy';
import { DetailsPage } from '../pages/details/details';
import { MessagesPage } from '../pages/messages/messages';
import { SettingsPage } from '../pages/settings/settings';
import { EasyPage } from '../pages/easy/easy';
import { MiddlePage } from '../pages/middle/middle';
import { TabsPage } from '../pages/tabs/tabs';
import { PlanService } from '../services/planService';
import { HttpClientModule } from '@angular/common/http'
import { DataBaseService } from '../services/databaseService';
import { SingupPage } from '../pages/singup/singup';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
import { TestPage } from '../pages/test/test';
import { ExercisePage } from '../pages/exercise/exercise';
import { ExerciseWithWeightsPage } from '../pages/exercise-with-weights/exercise-with-weights';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WorkoutPage,
    AboutUsPage,
    PrivacyPage,
    DetailsPage,
    MessagesPage,
    SettingsPage,
    EasyPage,
    MiddlePage,
    TabsPage,
    SingupPage,
    LoginPage,
    LogoutPage,
    TestPage,
    ExercisePage,
    ExerciseWithWeightsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WorkoutPage,
    AboutUsPage,
    PrivacyPage,
    DetailsPage,
    MessagesPage,
    SettingsPage,
    EasyPage,
    MiddlePage,
    TabsPage,
    SingupPage,
    LoginPage,
    LogoutPage,
    TestPage,
    ExercisePage,
    ExerciseWithWeightsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PlanService,
    DataBaseService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
