import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';
import { StopTrainingComponent } from '../stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent {
  progress = 0;
  timer!: TimerHandle;

  constructor(
    private dialog: MatDialog,
    private trainingSer: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.toggleTimer();
  }

  toggleTimer() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exer) => {
        const step = exer ? (exer.duration / 100) * 1000 : 0;
        this.timer = setInterval(() => {
          this.progress += 10;
          if (this.progress >= 100) {
            this.trainingSer.onExerciseComplete();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        clearInterval(this.timer);
        this.trainingSer.onExerciseCancel(this.progress);
      } else {
        this.toggleTimer();
      }
    });
  }
}
