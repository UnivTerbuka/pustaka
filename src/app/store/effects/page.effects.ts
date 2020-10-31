import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
  ChangePageAction,
  ChangePageSuccessAction,
  GetPageAction,
  GetPageFailureAction,
  GetPageSuccessAction,
  PageActionTypes,
} from '../actions/page.actions';
import { State } from '../reducers';
import { PageState } from '../reducers/page.reducer';

@Injectable()
export class PageEffects {
  page$: Observable<PageState>;
  @Effect() getPage$ = this.actions$.pipe(
    ofType<GetPageAction>(PageActionTypes.GET_PAGE),
    mergeMap((action) => {
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
        })
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
