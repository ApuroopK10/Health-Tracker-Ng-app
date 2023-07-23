import { Action } from '@ngrx/store';
import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from './auth.actions';

export interface State {
  isAuth: boolean;
}

const initialState: State = {
  isAuth: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions | Action
) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuth: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuth: false,
      };
    default:
      return {
        ...state,
      };
  }
}

export const getIsAuth = (state: State) => state.isAuth;
