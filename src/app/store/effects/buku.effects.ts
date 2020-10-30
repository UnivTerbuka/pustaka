import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
  BukuActionTypes,
  GetBukuAction,
  GetBukuFailureAction,
  GetBukuSuccessAction,
} from '../actions/buku.actions';

@Injectable()
export class BukuEffects {
  @Effect() getBuku$ = this.actions$.pipe(
    ofType<GetBukuAction>(BukuActionTypes.GET_BUKU),
    mergeMap((data) =>
      this.service.get(data.payload).pipe(
        map((buku) => new GetBukuSuccessAction(buku)),
        catchError((error) => of(new GetBukuFailureAction(error)))
      )
    )
  );
  constructor(private actions$: Actions, private service: BukuService) {}
}
