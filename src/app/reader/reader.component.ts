import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  pageInfo: PageInfo;
  page$: Observable<Page>;
  loading$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit(): void {
    this.pageInfo = {
      id: this.route.snapshot.paramMap.get('id'),
      modul: this.route.snapshot.paramMap.get('modul'),
      page: Number(this.route.snapshot.paramMap.get('page')),
    };
    this.store.dispatch(new GetPageAction(this.pageInfo));
    this.page$ = this.store.pipe(
      map((state) =>
        state.page.list.find((page) => page.number === this.pageInfo.page)
      )
    );
    this.loading$ = this.store.select((store) => store.page.loading);
  }
}
