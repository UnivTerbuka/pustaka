import { Action } from '@ngrx/store';
import { Page } from '../models/page';

export enum PageActionTypes {
  GET_PAGE = '[Page] Get Page',
  GET_PAGE_SUCCESS = '[Page] Get Page Success',
  GET_PAGE_FAILURE = '[Page] Get Page Failure',
}

export class GetPageAction implements Action {
  readonly type = PageActionTypes.GET_PAGE;
  constructor(public payload: string) {}
}

export class GetPageSuccessAction implements Action {
  readonly type = PageActionTypes.GET_PAGE_SUCCESS;
  constructor(public payload: Array<Page>) {}
}

export class GetPageFailureAction implements Action {
  readonly type = PageActionTypes.GET_PAGE_FAILURE;
  constructor(public payload: string) {}
}

export type PageAction =
  | GetPageAction
  | GetPageSuccessAction
  | GetPageFailureAction;
