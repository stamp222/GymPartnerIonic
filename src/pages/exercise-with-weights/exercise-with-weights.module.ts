import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExerciseWithWeightsPage } from './exercise-with-weights';

@NgModule({
  declarations: [
    ExerciseWithWeightsPage,
  ],
  imports: [
    IonicPageModule.forChild(ExerciseWithWeightsPage),
  ],
})
export class ExerciseWithWeightsPageModule {}
