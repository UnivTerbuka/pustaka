import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
  ChangePageAction,
  ChangePageFailureAction,
  ChangePageSuccessAction,
  GetPageAction,
  GetPageFailureAction,
  GetPageSuccessAction,
  PageActionTypes,
} from '../actions/page.actions';
import { Page } from '../models/page';
import { State } from '../reducers';
import { PageState } from '../reducers/page.reducer';

@Injectable()
export class PageEffects {
  page$: Observable<PageState>;
  @Effect() getPage$ = this.actions$.pipe(
    ofType<GetPageAction>(PageActionTypes.GET_PAGE),
    mergeMap((action) => {
      let pages: Array<Page>;
      this.page$.pipe(take(1)).subscribe((p) => (pages = p.list));
      if (pages.length > 0) {
        let p = pages.find(
          (p) =>
            p.id === action.payload.id &&
            p.modul === action.payload.modul &&
            p.number === action.payload.page
        );
        if (p) {
          return of(new GetPageSuccessAction(pages));
        }
      }
      return this.service.get_json(action.payload).pipe(
        map((page) => {
          page.forEach((page) => {
            page.id = action.payload.id;
            page.modul = action.payload.modul;
          });
          return new GetPageSuccessAction(page);
        }),
        catchError((error) => of(new GetPageFailureAction(error)))
      );
    })
  );
  @Effect() changePage$ = this.actions$.pipe(
    ofType<ChangePageAction>(PageActionTypes.CHANGE_PAGE),
    mergeMap((action) =>
      this.page$.pipe(
        map((page) => {
          let f = action.payload;
          let p = page.list.find(
            (p) => p.id === f.id && p.modul === f.modul && p.number === f.page
          );
          if (p) {
            return new ChangePageSuccessAction(page.list);
          } else return new GetPageAction(f);
        }),
        catchError((error) => of(new ChangePageFailureAction(error)))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private service: BukuService,
    private store: Store<State>
  ) {
    this.page$ = this.store.select((store) => store.page);
  }
}
