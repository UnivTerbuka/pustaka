import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReaderRoutingModule } from './reader-routing.module';
import { ReaderComponent } from './reader.component';

@NgModule({
  declarations: [ReaderComponent],
  imports: [
    CommonModule,
    ReaderRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
})
export class ReaderModule {}
