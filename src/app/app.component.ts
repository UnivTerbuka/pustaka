import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from './store/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from './store/models/page-info';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pustaka';
  currentPage$: Observable<PageInfo>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  loading$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private locationStrategy: LocationStrategy,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.loading$ = this.store.select((state) => state.buku.loading);
    this.currentPage$ = this.store.select((state) => state.page.current);
    let options: PageInfo = {
      id: this.activatedRoute.snapshot.queryParams.id,
      modul: this.activatedRoute.snapshot.queryParams.modul,
      page: Number(this.activatedRoute.snapshot.queryParams.page),
    };
    console.log(options);
    if (options && options.id && options.modul && options.page) {
      this.router.navigate(['read', options.id, options.modul, options.page]);
    }
  }

  public get currentUrl(): string {
    let options: PageInfo;
    this.currentPage$.pipe(take(1)).subscribe((p) => (options = p));
    let url = window.location.origin + this.locationStrategy.getBaseHref();
    if (options && options.id && options.modul && options.page) {
      let params = new URLSearchParams();
      for (let key in options) {
        params.set(key, options[key]);
      }
      url += '?' + params.toString();
    }
    return url;
  }
}
