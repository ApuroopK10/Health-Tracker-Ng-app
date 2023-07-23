import { Component } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent {
  trainingList$!: Observable<Exercise[]>;
  isLoading$!: Observable<boolean>;
  constructor(
    private trainingSer: TrainingService,
    private store: Store<{ ui: fromTraining.State }>
  ) {}
  selectedTraining = '';
  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainingList$ = this.store.select(fromTraining.getAvailableTrainings);
    this.trainingSer.fetchAvailableExercises();
  }

  onRetry() {
    this.trainingSer.fetchAvailableExercises();
  }

  onStartTraining() {
    this.trainingSer.onExerciseSelected(this.selectedTraining);
  }
}
