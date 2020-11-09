import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getBukuAction } from '../store/actions/buku.actions';
import { State } from '../store/reducers';

@Component({
  selector: 'app-search-buku',
  templateUrl: './search-buku.component.html',
  styleUrls: ['./search-buku.component.css'],
})
export class SearchBukuComponent implements OnInit {
  error: Observable<string>;
  buku = new FormControl('', Validators.pattern('^[a-zA-Z]{4}[0-9]{4,6}'));
  constructor(private store: Store<State>) {}
  ngOnInit(): void {
    this.error = this.store.select((state) => state.buku.error);
  }
  submit() {
    let id = this.buku.value.toUpperCase();
    this.store.dispatch(getBukuAction({ id }));
    this.buku.setValue('');
  }
}
