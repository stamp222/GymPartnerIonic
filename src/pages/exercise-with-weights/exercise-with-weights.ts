import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { PlanService } from '../../services/planService';
import { DataBaseService } from '../../services/databaseService';
import { exerciseModel } from '../../models/exerciseModel';
import { TestPage } from '../test/test';


@IonicPage()
@Component({
  selector: 'page-exercise-with-weights',
  templateUrl: 'exercise-with-weights.html',
})
export class ExerciseWithWeightsPage {
  testPage = TestPage;

  // imported 
  exercise: exerciseModel;
  level: number;
  exerciseIndex: number;

  //FOR COUNTDOWN TIMER
  timeInSeconds: any;
  runTimer: any;
  hasFinished: any;
  hasStarted: any;
  remainingTime: any;
  displayTime: any;
  isenabled: boolean = false;

  //FOR TIMER
  timeInSeconds2: any;
  runTimer2: any;
  hasFinished2: any;
  hasStarted2: any;
  remainingTime2: any;
  displayTime2: any;
  isenabled2: boolean = false;

  //score variables
  s1: number = 0;
  s2: number = 0;
  s3: number = 0;
  s4: number = 0;
  s5: number = 0;
  rep: string = "Not set";
  series: number = 0;
  score3: number;
  score4: number;
  score5: number;

  // button text
  buttonTimer: string = "START TIMER";
  buttonCnt: number = 1;

  showRow4: boolean = true;
  showRow5: boolean = true;

  // audio
  audio: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastController: ToastController, public planService: PlanService,
    public loadingCtrl: LoadingController, public dataBaseService: DataBaseService,
    public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.exercise = this.navParams.get('exercise');
    this.level = this.navParams.get('level');
    this.exerciseIndex = this.navParams.get('exerciseIndex');
    this.initTimer();
    this.audio = new Audio();
    this.audio.src = "../../assets/sounds/androidpik.mp3";
    this.audio.load();
  }
  ionViewDidLoad(): void {
    this.exerciseIndex = this.navParams.get('exerciseIndex');
  }

  ionViewWillEnter() {
    console.log(this.exerciseIndex);
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.dataBaseService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.planService.fetchExercises(this.level, token)
            .subscribe(
              (exercises: exerciseModel[]) => {
                loading.dismiss();
                if (exercises) {
                  this.series = exercises[this.exerciseIndex].series;
                  this.rep = exercises[this.exerciseIndex].rep;
                  if (exercises[this.exerciseIndex].series == 3) {
                    this.s1 = Math.round(exercises[this.exerciseIndex].score * 0.95);
                    this.s2 = Math.round(exercises[this.exerciseIndex].score * 1.00);
                    this.s3 = Math.round(exercises[this.exerciseIndex].score * 1.05);
                  } else if (exercises[this.exerciseIndex].series == 4) {
                    this.showRow4 = false;
                    this.s1 = Math.round(exercises[this.exerciseIndex].score * 0.9);
                    this.s2 = Math.round(exercises[this.exerciseIndex].score * 0.95);
                    this.s3 = Math.round(exercises[this.exerciseIndex].score * 1.00);
                    this.s4 = Math.round(exercises[this.exerciseIndex].score * 1.05);
                  } else if (exercises[this.exerciseIndex].series == 5) {
                    this.showRow4 = false;
                    this.showRow5 = false;
                    this.s1 = Math.round(exercises[this.exerciseIndex].score * 0.85);
                    this.s2 = Math.round(exercises[this.exerciseIndex].score * 0.90);
                    this.s3 = Math.round(exercises[this.exerciseIndex].score * 0.95);
                    this.s4 = Math.round(exercises[this.exerciseIndex].score * 1.00);
                    this.s5 = Math.round(exercises[this.exerciseIndex].score * 1.05);
                  } else {
                    console.log("Series doesnt work");
                  }
                } else {
                  console.log("Database doesn't work");
                }
              },
              error => {
                loading.dismiss();
                this.handleError(error.json().error);
              }
            );
        }
      );
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  saveScore() {
    this.dataBaseService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          if (this.series == 3 && this.score3 != undefined) {
            this.planService.updateScore(this.score3, this.level, this.exerciseIndex, token)
              .subscribe(
                data => {
                  const alert = this.alertCtrl.create({
                    title: 'Saved!',
                    message: 'Your score:' + String(data),
                    buttons: ['Ok']
                  });
                  alert.present();
                }
              );
          } else if (this.series == 4 && this.score4 != undefined) {
            this.planService.updateScore(this.score4, this.level, this.exerciseIndex, token)
              .subscribe(
                data => {
                  const alert = this.alertCtrl.create({
                    title: 'Saved!',
                    message: 'Your score:' + String(data),
                    buttons: ['Ok']
                  });
                  alert.present();
                }
              );
          } else if (this.series == 5 && this.score5 != undefined) {
            this.planService.updateScore(this.score5, this.level, this.exerciseIndex, token)
              .subscribe(
                data => {
                  const alert = this.alertCtrl.create({
                    title: 'Saved!',
                    message: 'Your score:' + String(data),
                    buttons: ['Ok']
                  });
                  alert.present();
                }
              );
          } else {
            const alert = this.alertCtrl.create({
              title: 'Not saved!',
              message: 'You have to fill all inputs',
              buttons: ['Ok']
            });
            alert.present();
            console.log("saveScore error");
          }
        }
      );
  }

  openTest() {
    this.navCtrl.push(TestPage, { 'exercise': this.exercise, 'level': this.level, 'exerciseIndex': this.exerciseIndex });
  }

  /* All for timers and countdown timers */
  initTimer() {
    if (!this.timeInSeconds) {
      this.timeInSeconds = 20; // countdown
      this.timeInSeconds2 = 0; // timer
    }
    // for countdown timer
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
    // for timer
    this.runTimer2 = false;
    this.hasStarted2 = false;
    this.hasFinished2 = false;
    this.remainingTime2 = this.timeInSeconds2;
    this.displayTime2 = this.getSecondsAsDigitalClock(this.remainingTime2);
  }

  timerTickForTimer() {
    setTimeout(() => {
      this.remainingTime2++;
      if (this.remainingTime2 <= 10) {
        this.isenabled2 = false;
      } else {
        this.hasFinished2 = true;
      }
      this.displayTime2 = this.getSecondsAsDigitalClock(this.remainingTime2);
      if (this.remainingTime2 > 0) {
        this.timerTickForTimer();
      }
      else {
        this.isenabled2 = false;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  timerTickForCountdown() {
    setTimeout(() => {
      if (!this.runTimer) { return; }
      this.remainingTime--;
      // for audio
      if (this.remainingTime < 10 && this.remainingTime > 0) {
        this.playAudio();
      } else {
        this.stopAudio();
      }
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.displayTime == "00:00:00") {
        this.isenabled = false;
      }
      if (this.remainingTime > 0) {
        this.timerTickForCountdown();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  startBreakTime() {
    this.isenabled = true;
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTickForCountdown();
    this.remainingTime = this.timeInSeconds;
  }

  breakTime() {
    this.startBreakTime();
    // changing color after break;
    // change color of input doesnt work!!!!!!!!!!!!!!
    // if(this.buttonCnt == 1) {
    //   this.buttonCnt++;
    //   this.buttonColor1 = "secondary";
    // } else if (this.buttonCnt == 2) {
    //   this.buttonCnt++;
    //   this.buttonColor2 = "secondary";
    // } else if (this.buttonCnt == 3) {
    //   this.buttonCnt++;
    //   this.buttonColor3 = "secondary";
    // } else if (this.buttonCnt == 4) {
    //   this.buttonCnt++;
    //   this.buttonColor4 = "secondary";
    // } else if (this.buttonCnt == 5) {
    //   this.buttonCnt++;
    //   this.buttonColor5 = "secondary";
    // } else {
    //   ;// do nothing
    // }
  }

  async startTimer() {
    if (this.buttonTimer == "STOP TIMER") {
      const toast = await this.toastController.create({
        message: "This exercise take you: " + this.displayTime2,
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Done'
      });
      toast.present();
      this.navCtrl.pop();
    }
    this.isenabled2 = true;
    this.runTimer2 = true;
    this.hasStarted2 = true;
    this.buttonTimer = "STOP TIMER";
    this.timerTickForTimer();
  }

  // Audio management
  playAudio() {
    this.audio.play();
    this.audio.loop = true;
  }

  stopAudio() {
    this.audio.pause();
  }

  // not needed right now
  /*
  pauseTimer() {
    this.runTimer = false;
  }
  
  resumeTimer() {
    this.startTimer();
  }
  */
}
