import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
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
          return of(new GetPageSuccessAction());
        }
      } else {
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
      }
    })
  );
  constructor(
    private actions$: Actions,
    private service: BukuService,
    private store: Store<State>
  ) {
    this.page$ = this.store.select((store) => store.page);
  }
}
