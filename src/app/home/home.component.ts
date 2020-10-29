import { Component } from '@angular/core';
import { BukuService } from '../buku.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private bukuService: BukuService) {}

  public get book(): any {
    return this.bukuService.myBook;
  }
}
