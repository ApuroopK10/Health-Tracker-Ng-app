import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
//  define how app wide States look like using below (will add other ones later)
export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

// group all reducers below, map of all the reducers of app wide state
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer, // actual reducer
  auth: fromAuth.authReducer,
};

// utility function using selectors that makes it easier to pull info from our state
// this createFeatureSelector helper func targets the ui slice of our store and gets quick access to the state
export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

// createSelector func takes state returned by createFeatureSelector and second param tells what to do with the state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
