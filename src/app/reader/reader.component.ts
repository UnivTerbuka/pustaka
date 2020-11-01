import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangePageAction, GetPageAction } from '../store/actions/page.actions';
import { Page } from '../store/models/page';
import { PageInfo } from '../store/models/page-info';
import { State } from '../store/reducers';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  init: boolean = false;
  completion: number = 0;
  pageEvent: PageEvent;
  pageInfo: PageInfo;
  current$: Observable<PageInfo>;
  page$: Observable<Page>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.pageInfo = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      modul: this.activatedRoute.snapshot.paramMap.get('modul'),
      page: Number(this.activatedRoute.snapshot.paramMap.get('page')),
    };

    this.store.dispatch(new ChangePageAction(this.pageInfo));
    this.current$ = this.store.select((store) => store.page.current);
    this.loading$ = this.store.select((store) => store.page.loading);
    this.error$ = this.store.select((store) => store.page.error);

    this.page$ = this.store.pipe(
      map((state) => {
        let cp = this.pageInfo;
        let p = state.page.list.find(
          (page) =>
            page.number === cp.page &&
            page.modul === cp.modul &&
            page.id === cp.id
        );
        if (p) {
          this.completion = Number((cp.page / p.pages) * 100);
          return p;
        } else if (!state.page.loading) {
          this.store.dispatch(new GetPageAction(this.pageInfo));
        }
      })
    );
  }

  pageEventHandler(event?: PageEvent) {
    this.pageInfo.page = event.pageIndex + 1;
    this.router.navigate([
      '/read',
      this.pageInfo.id,
      this.pageInfo.modul,
      event.pageIndex + 1,
    ]);
    this.store.dispatch(new ChangePageAction(this.pageInfo));
    // this.ngOnInit();
    return event;
  }
}
