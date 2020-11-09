import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../../environments/environment';
import { bukuReducer, BukuState } from './buku.reducer';
import { PageReducer, PageState } from './page.reducer';

export interface State {
  readonly buku: BukuState;
  readonly page: PageState;
  readonly router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<State> = {
  buku: bukuReducer,
  page: PageReducer,
  router: routerReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['buku', 'page'], rehydrate: true })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer];
