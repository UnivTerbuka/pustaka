import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Buku } from '../store/models/buku';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  buku$: Observable<Array<Buku>>;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.buku$ = this.store.select((store) => store.buku.list);
    this.loading$ = this.store.select((store) => store.buku.loading);
  }
}
