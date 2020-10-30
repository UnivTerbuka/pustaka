import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/reducers';
import { Buku } from '../store/models/buku';
import { DeleteBukuAction } from '../store/actions/buku.actions';

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
    this.store.dispatch(new DeleteBukuAction(this.buku.id));
  }
}
