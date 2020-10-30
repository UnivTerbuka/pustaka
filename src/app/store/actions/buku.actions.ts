import { Action, props } from '@ngrx/store';
import { Buku } from '../models/buku';

export enum BukuActionTypes {
  GET_BUKU = '[Buku] Get Buku',
  GET_BUKU_SUCCESS = '[Buku] Get Buku Success',
  GET_BUKU_FAILURE = '[Buku] Get Buku Failure',
  DELETE_BUKU = '[Buku] Delete Buku',
}

export class GetBukuAction implements Action {
  readonly type = BukuActionTypes.GET_BUKU;
  constructor(public payload: string) {}
}

export class GetBukuSuccessAction implements Action {
  readonly type = BukuActionTypes.GET_BUKU_SUCCESS;
  constructor(public payload: Buku) {}
}

export class GetBukuFailureAction implements Action {
  readonly type = BukuActionTypes.GET_BUKU_FAILURE;
  constructor(public payload: string) {}
}

export class DeleteBukuAction implements Action {
  readonly type = BukuActionTypes.DELETE_BUKU;
  constructor(public payload: string) {}
}

export type BukuAction =
  | GetBukuAction
  | GetBukuSuccessAction
  | GetBukuFailureAction
  | DeleteBukuAction;
