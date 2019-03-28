import { planModel } from "../models/planModel";
import { exerciseModel } from "../models/exerciseModel";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { DataBaseService } from "./databaseService";

@Injectable()
export class PlanService {

  private plans: planModel[] = [];
  private score: number;
  private exercises: exerciseModel[] = [];

  constructor(public http: HttpClient, public databaseService: DataBaseService) { }


  // for plan

  addPlan(title: string, difficulty: string, exercises: exerciseModel[]) {
    this.plans.push(new planModel(title, difficulty, exercises));
    console.log(this.plans);
  }

  updatePlan(index: number, title: string, difficulty: string, exercises: exerciseModel[]) {
    this.plans[index] = new planModel(title, difficulty, exercises);
    console.log(this.plans);
  }

  getPlans() {
    return this.plans.slice();
  }

  removePlan(index: number) {
    this.plans.splice(index, 1);
  }

  storePlan(token: string) {
    //const userId = this.databaseService.getActiveUser().uid;
    return this.http
      .put('https://gympartner-2cfcc.firebaseio.com/Plans.json?auth=' + token, this.plans);
  }

  fetchPlan(token: string) {
    //const userId = this.databaseService.getActiveUser().uid;
    return this.http.get('https://gympartner-2cfcc.firebaseio.com/Plans.json?auth=' + token)
      .do((plans: planModel[]) => {
        if (plans) {
          for (let item of plans) {
            if (!item.hasOwnProperty('exercises')) {
              item.exercises = [];
            }
          }
          this.plans = plans
        } else {
          this.plans = [];
        }
      });
  }

  // for exercise

  // usunąłem name
  updateScore(score: number, planNumber: number, exerciseIndex: number, token: string) {
    return this.http
      .put('https://gympartner-2cfcc.firebaseio.com/Plans/' + planNumber + '/exercises/' + exerciseIndex + '/score.json?auth=' + token, score);
  }

  fetchScore(planNumber: number, exerciseIndex: number, token: string) {
    return this.http
      .get('https://gympartner-2cfcc.firebaseio.com/Plans/' + planNumber + '/exercises/' + exerciseIndex + '/score.json?auth=' + token)
      .do((score: number) => {
        if (score) {
          this.score = score;
        } else {
          this.score = 1;
        }
      });
  }
  getScore() {
    return this.score;
  }
  fetchExercises(planNumber: number, token: string) {
    return this.http
      .get('https://gympartner-2cfcc.firebaseio.com/Plans/' + planNumber + '/exercises.json?auth=' + token)
      .do((exercises: exerciseModel[]) => {
        if (exercises) {
          this.exercises = exercises;
        } else {
          console.log("Fetch exercises error");
          this.exercises = null;
        }
      });
  }
  getExercises() {
    return this.exercises.slice();
  }


}
