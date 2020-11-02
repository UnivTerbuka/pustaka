import { Action } from '@ngrx/store';
import { Page } from '../models/page';
import { PageInfo } from '../models/page-info';

export enum PageActionTypes {
  GET_PAGE = '[Page] Get Page',
  GET_PAGE_SUCCESS = '[Page] Get Page Success',
  GET_PAGE_FAILURE = '[Page] Get Page Failure',
  CHANGE_PAGE = '[Page] Change Page',
  DELETE_PAGE = '[Page] Delete Page',
}

export class GetPageAction implements Action {
  readonly type = PageActionTypes.GET_PAGE;
  constructor(public payload: PageInfo) {}
}

export class GetPageSuccessAction implements Action {
  readonly type = PageActionTypes.GET_PAGE_SUCCESS;
  constructor(public payload?: Array<Page>) {}
}

export class GetPageFailureAction implements Action {
  readonly type = PageActionTypes.GET_PAGE_FAILURE;
  constructor(public payload?: string) {}
}

export class ChangePageAction implements Action {
  readonly type = PageActionTypes.CHANGE_PAGE;
  constructor(public payload: PageInfo) {}
}

export class DeletePageAction implements Action {
  readonly type = PageActionTypes.DELETE_PAGE;
  constructor(public payload: PageInfo) {}
}

export type PageAction =
  | GetPageAction
  | GetPageSuccessAction
  | GetPageFailureAction
  | ChangePageAction
  | DeletePageAction;
