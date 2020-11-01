import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';
import { Buku } from './store/models/buku';
import { Font, Page } from './store/models/page';
import { PageInfo } from './store/models/page-info';
import { State } from './store/reducers';

@Injectable({
  providedIn: 'root',
})
export class BukuService {
  pages$: Observable<Array<Page>>;
  fonts$: Observable<Array<Font>>;

  private URL = 'https://universitas-terbuka-bot.herokuapp.com/pustaka';
  constructor(private http: HttpClient, private store: Store<State>) {
    this.pages$ = store.select((state) => state.page.list);
  }

  get(id: string) {
    return this.http.get<Buku>(this.URL + `/book/${id}`);
  }

  get_text(page: PageInfo) {
    return this.http.get<string>(
      this.URL + `/txt/${page.id}/${page.modul}/${page.page || 1}`
    );
  }

  get_json(page: PageInfo) {
    return this.http.get<Array<Page>>(
      this.URL + `/json/${page.id}/${page.modul}/${page.page || 1}`
    );
  }

  get_image(page: PageInfo) {
    return this.http.get<HttpResponse<string>>(
      this.URL + `/img/${page.id}/${page.modul}/${page.page || 1}`
    );
  }

  get_page(page: PageInfo): Observable<Page[]> {
    return this.pages$.pipe(
      map((pages) =>
        pages.filter(
          (p) =>
            p.number === page.page && p.modul === page.modul && p.id === page.id
        )
      ),
      filter((pages) => pages && pages.length > 0)
    );
  }

  get_fonts(page: PageInfo): Array<Font> {
    let fonts: Array<Font>;
    this.pages$
      .pipe(
        mergeMap((pages) => {
          let p = pages.find((p) => p.modul === page.modul && p.id === page.id);
          return of(p.fonts);
        }),
        filter((fonts) => fonts && fonts.length > 0),
        take(1)
      )
      .subscribe((f) => (fonts = f));
    return fonts;
  }
}
