import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReaderRoutingModule } from './reader-routing.module';
import { ReaderComponent } from './reader.component';
import { TextComponent } from './text/text.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [ReaderComponent, TextComponent, PageComponent],
  imports: [CommonModule, ReaderRoutingModule, MatProgressSpinnerModule],
})
export class ReaderModule {}
