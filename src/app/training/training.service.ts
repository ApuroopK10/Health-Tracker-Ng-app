import { Injectable, inject } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Subscription, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './trianing.actions';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  availableExercises: Exercise[] = [];
  pastExercises: Exercise[] = [];
  firestore: Firestore = inject(Firestore);

  fbSubs: Subscription[] = [];

  constructor(
    private store: Store<{ ui: fromTraining.State }>,
    private uISer: UiService
  ) {}

  fetchAvailableExercises(typeOfExercise = 'availableExercises') {
    this.store.dispatch(new UI.StartLoading());
    const trCollection = collection(this.firestore, typeOfExercise);
    this.fbSubs.push(
      collectionData(trCollection)
        .pipe(map((data) => data))
        .subscribe(
          (finalData: any) => {
            let exerList: Exercise[] = finalData;
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exerList));
          },
          (error) => {
            this.store.dispatch(new UI.StopLoading());

            this.uISer.showSnackbar(
              'Failed to get exercises, try again',
              null,
              3000
            );
          }
        )
    );
  }

  fetchPastExercises() {
    const trCollection = collection(this.firestore, 'finishedExercises');
    this.fbSubs.push(
      collectionData(trCollection).subscribe((exerList) => {
        this.pastExercises = exerList as Exercise[];
        this.store.dispatch(
          new Training.SetFinishedTrainings({ ...this.pastExercises })
        );
      })
    );
  }

  onExerciseSelected(exerId: string) {
    this.store.dispatch(new Training.StartTraining(exerId));
  }

  onExerciseComplete() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        const exer = exercise as Exercise;
        this.addtoDb({
          ...exer,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  onExerciseCancel(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((exercise) => {
        const exer = exercise as Exercise;
        this.addtoDb({
          ...exer,
          date: new Date(),
          state: 'cancelled',
          duration: (exer.duration * progress) / 100,
          calories: (exer.calories * progress) / 100,
        });
        this.store.dispatch(new Training.StopTraining());
        // this.runningExercise = {};
        // this.trainingSelected.next(null);
      });
  }

  private addtoDb(exer: Exercise) {
    let saveColl = collection(this.firestore, 'finishedExercises');
    addDoc(saveColl, exer).then((data) => {
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelSubs() {
    this.fbSubs.forEach((sub) => sub.unsubscribe());
  }
}
