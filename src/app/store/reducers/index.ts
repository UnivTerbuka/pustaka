import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../../environments/environment';
import { BukuReducer, BukuState } from './buku.reducer';
import { PageReducer, PageState } from './page.reducer';

export interface State {
  readonly buku: BukuState;
  readonly page: PageState;
}

export const reducers: ActionReducerMap<State> = {
  buku: BukuReducer,
  page: PageReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['pustaka'] })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
