import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BukuService } from '../buku.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  id: string;
  modul: string;
  page: number;
  _url: string;
  content$: Observable<string>;
  constructor(private route: ActivatedRoute, private service: BukuService) {}

  ngOnInit(): void {
    this.content$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id');
        this.modul = params.get('modul');
        this.page = Number(params.get('page'));
        this.service
          .get_image({ id: this.id, modul: this.modul, page: this.page })
          .subscribe((data) => {
            this._url = data.headers.get('location');
          });
        return this.service.get_text({
          id: this.id,
          modul: this.modul,
          page: this.page,
        });
      })
    );
  }

  public get image(): string {
    return `url(${this._url})`;
  }
}
