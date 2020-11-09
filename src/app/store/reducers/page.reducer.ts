import { createReducer, on } from '@ngrx/store';
import {
  changePageAction,
  deletePageAction,
  getPageAction,
  getPageFailureAction,
  getPageSuccessAction,
} from '../actions/page.actions';
import { Page } from '../models/page';
import { PageInfo } from '../models/page-info';

export interface PageState {
  list: Array<Page>;
  current?: PageInfo;
  loading: boolean;
  error?: string;
}

const initialPageState: PageState = {
  list: [],
  loading: false,
  current: undefined,
  error: undefined,
};

export const pageReducer = createReducer(
  initialPageState,
  on(getPageAction, (state) => ({ ...state, loading: true })),
  on(getPageSuccessAction, (state, { pages }) => ({
    list: [...state.list, ...pages],
    current: state.current,
    loading: false,
  })),
  on(getPageFailureAction, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(changePageAction, (state, { info }) => ({ ...state, current: info })),
  on(deletePageAction, (state, { info }) => ({
    ...state,
    list: state.list.filter((p) => p.id !== info.id),
    current: state.current.id !== info.id ? state.current : undefined,
  }))
);
