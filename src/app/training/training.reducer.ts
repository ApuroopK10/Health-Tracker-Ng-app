import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
  TrainingActions,
} from './trianing.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise | null;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercises: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload,
      };

    case START_TRAINING:
      return {
        ...state,
        activeTraining: state.availableExercises.find(
          (exer) => exer.tid === action.payload
        ),
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default:
      return {
        ...state,
      };
  }
}

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedTrainings = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);

export const getIsActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining !== null
);
