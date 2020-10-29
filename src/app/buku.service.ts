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

  public get myBook(): any[] {
    return [{ id: 'BING330102', cols: 1, rows: 1 }];
  }
}
