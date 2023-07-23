import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingRouteModule } from './training-route.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRouteModule,
    StoreModule.forFeature('training', trainingReducer),
  ],
  entryComponents: [StopTrainingComponent],
})
export class TrainingModule {}
