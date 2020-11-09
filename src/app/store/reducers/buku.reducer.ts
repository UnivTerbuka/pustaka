import { createReducer, on } from '@ngrx/store';
import {
  deleteBukuAction,
  getBukuAction,
  getBukuFailureAction,
  getBukuSuccessAction,
} from '../actions/buku.actions';
import { Buku } from '../models/buku';

export interface BukuState {
  list: Array<Buku>;
  loading: boolean;
  error?: string;
}

const initialBukuState: BukuState = {
  list: [],
  loading: false,
  error: undefined,
};

export const bukuReducer = createReducer(
  initialBukuState,
  on(getBukuAction, (state) => ({ ...state, loading: true })),
  on(getBukuSuccessAction, (state, { buku }) => ({
    ...state,
    list: [buku, ...state.list],
    loading: false,
  })),
  on(getBukuFailureAction, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(deleteBukuAction, (state, { id }) => ({
    ...state,
    list: state.list.filter((item) => item.id !== id),
  }))
);
