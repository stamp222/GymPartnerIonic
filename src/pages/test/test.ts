import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { exerciseModel } from '../../models/exerciseModel';
import { PlanService } from '../../services/planService';
import { DataBaseService } from '../../services/databaseService';
import { ExercisePage } from '../exercise/exercise';
import { ExerciseWithWeightsPage } from '../exercise-with-weights/exercise-with-weights';

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  exercise: exerciseModel;
  score: number;
  level: number;
  exerciseIndex: number;

  text: string = "DLUGI TEKST";
  text2: string = "DLUGI TEKST2";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public planService: PlanService, public databaseSerive: DataBaseService,
    public alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.exercise = this.navParams.get('exercise');
    this.level = this.navParams.get('level');
    if (this.level == 0) {
      this.text = "Zapamiętaj tę jedną zasadę: jak tylko poczujesz jakiś opór, rób wydech. Wdech robisz przy pompce wtedy, gdy opadasz, kiedy ciało odczuwa najmniejszy wysiłek.";
      this.text2 = "Wykonaj maksymalną liczbę powtórzeń jaką jesteś w stanie wykonać w danym ćwiczeniu.";
    } else if (this.level == 1) {
      this.text = "Zrób sobie w czasie rozgrzewki kilka pompek, skłonów, przysiadów bez obciążenia, wykonaj krążenie ramion i kilka ćwiczeń rozciągających.";
      this.text2 = "Wykonaj 10 powtórzeń danego ćwiczenia z maksymalnym ciężarem jakim jesteś w stanie udźwignąć.";
    } else {
      this.text = "Jeszcze nie obsłużone";
    }
    this.exerciseIndex = this.navParams.get('exerciseIndex');
  }

  saveScore() {
    this.databaseSerive.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.planService.updateScore(this.score, this.level, this.exerciseIndex, token)
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
        }
      );
  }

  openExercise() {
    if (this.level == 0) {
      this.navCtrl.push(ExercisePage, { 'exercise': this.exercise, 'level': this.level, 'exerciseIndex': this.exerciseIndex });
    } else if (this.level == 1) {
      this.navCtrl.push(ExerciseWithWeightsPage, { 'exercise': this.exercise, 'level': this.level, 'exerciseIndex': this.exerciseIndex });
    } else {
      ;// by the time it's not serve
    }
  }
}
