import { Component } from '@angular/core';
import { TrainingService } from './training.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent {
  onGoingTraining$!: Observable<boolean>;
  constructor(
    private trainingSer: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsActiveTraining);
  }
}
