import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BukuService } from '../buku.service';
import { Font, Page } from '../store/models/page';
import { PageInfo } from '../store/models/page-info';
import { State } from '../store/reducers';
import { getCurrentRouteState } from '../store/selectors/router.selector';
import { changePageAction, getPageAction } from '../store/actions/page.actions';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

interface TextStyle {
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
  size?: string | number;
  color?: string;
}

@UntilDestroy()
@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit, OnDestroy {
  init: boolean = false;
  halaman = new FormControl(0);

  pageEvent: PageEvent;
  pageInfo: PageInfo;
  fonts: Array<Font>;
  loading$: Observable<boolean>;
  pages$: Observable<Array<Page>>;

  constructor(
    private router: Router,
    private store: Store<State>,
    private service: BukuService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store.select((store) => store.page.loading);
    this.store
      .pipe(select(getCurrentRouteState), untilDestroyed(this))
      .subscribe((route: any) => {
        this.pageInfo = {
          id: route.params.id,
          modul: route.params.modul,
          page: Number(route.params.page),
        };
        this.store.dispatch(changePageAction({ info: this.pageInfo }));
        this.store.dispatch(getPageAction({ info: this.pageInfo }));
        this.pages$ = this.service.get_page(this.pageInfo);
        this.fonts = this.service.get_fonts(this.pageInfo);
        if (this.pageInfo?.page) {
          this.halaman.setValue(this.pageInfo.page);
        }
      });
  }

  completion(page: number, pages: number): number {
    return Number((page / pages) * 100);
  }

  public pages(n: number): Array<number> {
    return Array(n)
      .fill(1)
      .map((v, i) => v + i);
  }

  ngOnDestroy(): void {
    this.store.dispatch(changePageAction({ info: null }));
  }

  pageEventHandler(event?: PageEvent) {
    this.pageInfo = {
      ...this.pageInfo,
      page: event.pageIndex + 1,
    };
    this.changePage();
    return event;
  }

  selectEventHandler(event?: MatSelectChange) {
    console.log(event);
    this.pageInfo = {
      ...this.pageInfo,
      page: Number(event.value),
    };
    this.changePage();
    return event;
  }

  changePage(page?: number): void {
    this.router.navigate([
      '/read',
      this.pageInfo.id,
      this.pageInfo.modul,
      page || this.pageInfo.page,
    ]);
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
