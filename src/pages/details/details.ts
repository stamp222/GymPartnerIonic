import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { exerciseModel } from '../../models/exerciseModel';
import { ExercisePage } from '../exercise/exercise';
import { TestPage } from '../test/test';
import { ExerciseWithWeightsPage } from '../exercise-with-weights/exercise-with-weights';
@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  exercise: exerciseModel;
  level: number;
  exerciseIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(): void {
    this.exercise = this.navParams.get('exercise');
    this.level = this.navParams.get('level');
    this.exerciseIndex = this.navParams.get('exerciseIndex');
  }

  openUrl() {
    window.open(this.exercise.link, '_system');
  }
  openTest() {
    this.navCtrl.push(TestPage, { 'exercise': this.exercise, 'level': this.level, 'exerciseIndex': this.exerciseIndex });
  }

  openExercise() {
    if (this.level == 0) {
      this.navCtrl.push(ExercisePage, { 'exercise': this.exercise, 'level': this.level, 'exerciseIndex': this.exerciseIndex });
    } else if (this.level == 1) {
      this.navCtrl.push(ExerciseWithWeightsPage, { 'exercise': this.exercise, 'level': this.level, 'exerciseIndex': this.exerciseIndex });
    } else {
      ;// to be continue...
    }

  }
}
