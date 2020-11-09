import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Buku } from '../store/models/buku';
import { deleteBukuAction } from '../store/actions/buku.actions';
import { deletePageAction } from '../store/actions/page.actions';
import { PageInfo } from '../store/models/page-info';

@Component({
  selector: 'buku-card',
  templateUrl: './buku-card.component.html',
  styleUrls: ['./buku-card.component.css'],
})
export class BukuCardComponent implements OnInit {
  @Input() buku: Buku;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  delete() {
    let id = this.buku.id;
    this.store.dispatch(deleteBukuAction({ id }));
    let info: PageInfo = { id, modul: '', page: 0 };
    this.store.dispatch(deletePageAction({ info }));
  }
}
