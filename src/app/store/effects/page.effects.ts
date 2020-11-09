import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take, tap } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
  getPageAction,
  getPageFailureAction,
  getPageSuccessAction,
} from '../actions/page.actions';
import { Page } from '../models/page';
import { State } from '../reducers';
import { PageState } from '../reducers/page.reducer';

@Injectable()
export class PageEffects {
  page$: Observable<PageState>;

  @Effect() getPage$ = this.actions$.pipe(
    ofType(getPageAction),
    mergeMap(({ info }) => {
      let pages: Array<Page>;
      this.page$
        .pipe(
          take(1),
          tap((state) => (pages = state.list))
        )
        .subscribe();
      if (pages.length > 0) {
        let p = pages.find(
          (p) =>
            p.id === info.id && p.modul === info.modul && p.number === info.page
        );
        if (p) {
          return of(getPageSuccessAction({ pages: [] }));
        }
      }
      return this.service.get_json(info).pipe(
        map((pages) => {
          pages.forEach((page) => {
            page.id = info.id;
            page.modul = info.modul;
          });
          return getPageSuccessAction({ pages });
        }),
        catchError((error) => of(getPageFailureAction({ error })))
      );
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
