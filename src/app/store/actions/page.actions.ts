import { Action, createAction, props } from '@ngrx/store';
import { Page } from '../models/page';
import { PageInfo } from '../models/page-info';

export const getPageAction = createAction(
  '[Page] Get Page',
  props<{ info: PageInfo }>()
);

export const getPageSuccessAction = createAction(
  '[Page] Get Page Success',
  props<{ pages: Array<Page> }>()
);

export const getPageFailureAction = createAction(
  '[Page] Get Page Failure',
  props<{ error: string }>()
);

export const changePageAction = createAction(
  '[Page] Change Page',
  props<{ info: PageInfo }>()
);

export const deletePageAction = createAction(
  '[Page] Delete Page',
  props<{ info: PageInfo }>()
);
