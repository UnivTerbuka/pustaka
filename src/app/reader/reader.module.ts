import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatProgressBarModule,
  ],
})
export class ReaderModule {}
