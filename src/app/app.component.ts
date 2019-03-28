import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutUsPage } from '../pages/about-us/about-us';
import { PrivacyPage } from '../pages/privacy/privacy';
import { WorkoutPage } from '../pages/workout/workout';
import firebase from 'firebase';
import { MessagesPage } from '../pages/messages/messages';
import { LoginPage } from '../pages/login/login';
import { SingupPage } from '../pages/singup/singup';
import { LogoutPage } from '../pages/logout/logout';
import { DataBaseService } from '../services/databaseService';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  aboutUsPageL = AboutUsPage;
  privacyPageL = PrivacyPage;
  workoutPageL = WorkoutPage;
  homePageL = HomePage;
  messagesPageL = MessagesPage;
  isAuthenticated = false;
  loginPageL = LoginPage;
  signupPageL = SingupPage;
  logoutPageL = LogoutPage;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private databaseService: DataBaseService) {
    firebase.initializeApp({
      apiKey: "AIzaSyDGsXPRpSt2OFv6tmp0oa2hefjaCmvptKk",
      authDomain: "gympartner-2cfcc.firebaseapp.com"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage = HomePage
      } else {
        this.isAuthenticated = false;
        this.rootPage = this.loginPageL;
      }
    })
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogOut() {
    this.databaseService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.loginPageL);
  }
}

