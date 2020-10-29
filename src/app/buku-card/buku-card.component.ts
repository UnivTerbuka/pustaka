import { Component, Input, OnInit } from '@angular/core';
import { Buku } from '../buku';
import { BukuService } from '../buku.service';

@Component({
  selector: 'buku-card',
  templateUrl: './buku-card.component.html',
  styleUrls: ['./buku-card.component.css'],
})
export class BukuCardComponent implements OnInit {
  @Input() id: string;
  buku: Buku;

  constructor(private bukuService: BukuService) {}

  ngOnInit(): void {
    this.bukuService
      .get(this.id)
      .subscribe(
        (data) =>
          (this.buku = { id: (data as any).id, modul: (data as any).modul })
      );
  }
}
