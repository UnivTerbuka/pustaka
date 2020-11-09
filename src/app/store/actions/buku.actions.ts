import { Action, createAction, props } from '@ngrx/store';
import { Buku } from '../models/buku';

export const getBukuAction = createAction(
  '[Buku] Get Buku',
  props<{ id: string }>()
);

export const getBukuSuccessAction = createAction(
  '[Buku] Get Buku Success',
  props<{ buku: Buku }>()
);

export const getBukuFailureAction = createAction(
  '[Buku] Get Buku Failure',
  props<{ error: string }>()
);

export const deleteBukuAction = createAction(
  '[Buku] Delete Buku',
  props<{ id: string }>()
);
