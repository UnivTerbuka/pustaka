import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buku } from './store/models/buku';
import { Page } from './store/models/page';
import { PageInfo } from './store/models/page-info';

@Injectable({
  providedIn: 'root',
})
export class BukuService {
  private URL = 'https://universitas-terbuka-bot.herokuapp.com/pustaka';
  constructor(private http: HttpClient) {}

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

  open(id: string, modul: string, page: number = 1) {
    alert(id + modul);
  }
}
