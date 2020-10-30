import { Component, Input, OnInit } from '@angular/core';
import { Buku } from '../store/models/buku';
import { BukuService } from '../buku.service';

@Component({
  selector: 'buku-card',
  templateUrl: './buku-card.component.html',
  styleUrls: ['./buku-card.component.css'],
})
export class BukuCardComponent implements OnInit {
  @Input() buku: Buku;

  constructor() {}

  ngOnInit(): void {}
}
