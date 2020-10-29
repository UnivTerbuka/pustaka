import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buku } from './buku';

@Injectable({
  providedIn: 'root',
})
export class BukuService {
  constructor(private http: HttpClient) {}

  get(id: string) {
    return this.http.get<Buku>(
      'https://universitas-terbuka-bot.herokuapp.com/pustaka/book/' + id
    );
  }

  get_text(id: string, modul: string, page: number = 1) {
    return this.http.get<string>(
      `https://universitas-terbuka-bot.herokuapp.com/pustaka/txt/${id}/${modul}/${page}`
    );
  }

  get_json(id: string, modul: string, page: number = 1) {
    return this.http.get<string>(
      `https://universitas-terbuka-bot.herokuapp.com/pustaka/json/${id}/${modul}/${page}`
    );
  }

  get_image(id: string, modul: string, page: number = 1) {
    return this.http.get<string>(
      `https://universitas-terbuka-bot.herokuapp.com/pustaka/img/${id}/${modul}/${page}`
    );
  }

  open(id: string, modul: string, page: number = 1) {
    alert(id + modul);
  }

  public get myBook(): any[] {
    return [{ id: 'BING330102', cols: 1, rows: 1 }];
  }
}
