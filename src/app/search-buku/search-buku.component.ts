import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GetBukuAction } from '../store/actions/buku.actions';
import { State } from '../store/reducers';

@Component({
  selector: 'app-search-buku',
  templateUrl: './search-buku.component.html',
  styleUrls: ['./search-buku.component.css'],
})
export class SearchBukuComponent implements OnInit {
  field = new FormControl('', Validators.pattern('^[a-zA-Z]{4}[0-9]{4,6}'));
  constructor(private store: Store<State>) {}
  ngOnInit(): void {}
  submit() {
    this.store.dispatch(new GetBukuAction(this.field.value.toUpperCase()));
    this.field.setValue('');
  }
}
