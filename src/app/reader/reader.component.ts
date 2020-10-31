import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetPageAction } from '../store/actions/page.actions';
import { Page } from '../store/models/page';
import { PageInfo } from '../store/models/page-info';
import { State } from '../store/reducers';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  pageEvent: PageEvent;
  pageInfo: PageInfo;
  page$: Observable<Page>;
  loading$: Observable<boolean>;

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
          return p;
        } else if (!state.page.loading) {
          this.store.dispatch(new GetPageAction(this.pageInfo));
        }
      })
    );
    this.loading$ = this.store.select((store) => store.page.loading);
  }

  pageEventHandler(event?: PageEvent) {
    console.log(JSON.stringify(event));
    this.router.navigate([
      '/read',
      this.pageInfo.id,
      this.pageInfo.modul,
      event.pageIndex + 1,
    ]);
    return event;
  }
}
