import { createSelector } from '@ngrx/store';
import { Buku } from '../models/buku';
import { State } from '../reducers';

export const getBukuState = (state: State) => state.buku;

export const getAllBukuState = (state: State) => state.buku.list;

export const getBuku = createSelector(
  getAllBukuState,
  (state: Array<Buku>, props: any) => state.find((b) => b.id === props.id)
);
