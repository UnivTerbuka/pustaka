import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-buku',
  templateUrl: './search-buku.component.html',
  styleUrls: ['./search-buku.component.css'],
})
export class SearchBukuComponent implements OnInit {
  value: string;

  ngOnInit(): void {}
}
