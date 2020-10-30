import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Buku } from '../store/models/buku';
import { BukuService } from '../buku.service';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  buku$: Observable<Array<Buku>>;
  constructor(private bukuService: BukuService, private store: Store<State>) {}

  ngOnInit() {
    this.buku$ = this.store.select((store) => store.buku.list);
  }
}
