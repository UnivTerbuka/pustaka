import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BukuService } from 'src/app/buku.service';
import {
  getBukuAction,
  getBukuFailureAction,
  getBukuSuccessAction,
} from '../actions/buku.actions';

@Injectable()
export class BukuEffects {
  @Effect() getBuku$ = this.actions$.pipe(
    ofType(getBukuAction),
    mergeMap(({ id }) =>
      this.service.get(id).pipe(
        map((buku) => getBukuSuccessAction({ buku })),
        catchError((error) => of(getBukuFailureAction({ error })))
      )
    )
  );
  constructor(private actions$: Actions, private service: BukuService) {}
}
