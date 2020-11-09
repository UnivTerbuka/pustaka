import { RouterReducerState } from '@ngrx/router-store';
import { createSelector } from '@ngrx/store';
import { State } from '../reducers';

export const getRouterState = (state: State) => state.router;

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: RouterReducerState) => state.state
);
