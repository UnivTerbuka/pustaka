import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BukuService } from '../buku.service';
import { ChangePageAction, GetPageAction } from '../store/actions/page.actions';
import { Font, Page } from '../store/models/page';
import { PageInfo } from '../store/models/page-info';
import { State } from '../store/reducers';

interface TextStyle {
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
  size?: string | number;
  color?: string;
}

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
  fonts: Array<Font>;
  pages$: Observable<Array<Page>>;
  current$: Observable<PageInfo>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private service: BukuService
  ) {}

  ngOnInit(): void {
    this.pageInfo = {
      id: this.activatedRoute.snapshot.paramMap.get('id'),
      modul: this.activatedRoute.snapshot.paramMap.get('modul'),
      page: Number(this.activatedRoute.snapshot.paramMap.get('page')),
    };
    this.store.dispatch(new ChangePageAction(this.pageInfo));
    this.store.dispatch(new GetPageAction(this.pageInfo));
    this.current$ = this.store.select((store) => store.page.current);
    this.loading$ = this.store.select((store) => store.page.loading);
    this.error$ = this.store.select((store) => store.page.error);
    this.pages$ = this.service.get_page(this.pageInfo);
    this.fonts = this.service.get_fonts(this.pageInfo);
  }

  pageEventHandler(event?: PageEvent) {
    this.pageInfo = {
      ...this.pageInfo,
      page: event.pageIndex + 1,
    };
    this.router.navigate([
      '/read',
      this.pageInfo.id,
      this.pageInfo.modul,
      event.pageIndex + 1,
    ]);
    let page = this.service.get_page(this.pageInfo);
    if (page) {
      this.pages$ = page;
      this.fonts = this.service.get_fonts(this.pageInfo);
    } else {
      this.ngOnInit();
    }
    this.store.dispatch(new ChangePageAction(this.pageInfo));
    return event;
  }

  getStyle(text: Array<number | string>): TextStyle {
    return {
      top: text[0] + 'px',
      left: text[1] + 'px',
      width: text[2] + 'px',
      height: text[3] + 'px',
    };
  }
}
