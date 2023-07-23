import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements AfterViewInit {
  pastTrainings = new MatTableDataSource<Exercise>();
  pastTraining$!: Observable<Exercise[]>;
  displayedColumns: string[] = [
    'date',
    'name',
    'calories',
    'duration',
    'state',
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private trainingSer: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.store
      .select(fromTraining.getFinishedTrainings)
      .pipe(take(1))
      .subscribe((data) => {
        this.pastTrainings = new MatTableDataSource(Object.values(data));
      });
    this.trainingSer.fetchPastExercises();
  }

  ngAfterViewInit(): void {
    this.pastTrainings.sort = this.sort;
    this.pastTrainings.paginator = this.paginator;
  }

  doFilter(inputStr: Event) {
    this.pastTrainings.filter = (inputStr.target as HTMLInputElement).value
      .trim()
      .toLocaleLowerCase();
  }
}
