import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, PopoverController } from "ionic-angular";
import { planModel } from '../../models/planModel';
import { PlanService } from '../../services/planService';
import { DetailsPage } from '../details/details';
import { DataBaseService } from '../../services/databaseService';
import { exerciseModel } from '../../models/exerciseModel';


@Component({
  selector: 'page-easy',
  templateUrl: 'easy.html'
})
export class EasyPage {
  readonly EASYLEVEL = 0;
  plans: planModel[];
  exercises: exerciseModel[];

  constructor(private navCtrl: NavController, public planService: PlanService, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public popOverCtrl: PopoverController,
    public dataBaseService: DataBaseService,
  ) { }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.dataBaseService.getActiveUser().getIdToken()
      .then(
        (token: string) => {
          this.planService.fetchPlan(token)
            .subscribe(
              (list: planModel[]) => {
                loading.dismiss();
                if (list) {
                  this.plans = list;
                  this.exercises = this.plans[this.EASYLEVEL].exercises;
                } else {
                  this.plans = [];
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

  onDetails(item: exerciseModel, index: number) {
    this.navCtrl.push(DetailsPage, { 'exercise': item, 'level': this.EASYLEVEL, 'exerciseIndex': index });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
