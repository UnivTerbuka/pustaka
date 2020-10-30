import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
  GetPageAction,
  GetPageFailureAction,
  GetPageSuccessAction,
  PageActionTypes,
} from '../actions/page.actions';

@Injectable()
export class PageEffects {
  @Effect() getPage$ = this.actions$.pipe(
    ofType<GetPageAction>(PageActionTypes.GET_PAGE),
    mergeMap((data) =>
      this.service.get_json(data.payload).pipe(
        map((page) => new GetPageSuccessAction(page)),
        catchError((error) => of(new GetPageFailureAction(error)))
      )
    )
  );
  constructor(private actions$: Actions, private service: BukuService) {}
}
