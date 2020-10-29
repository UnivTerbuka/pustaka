import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  id: string;
  modul: string;
  page: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
