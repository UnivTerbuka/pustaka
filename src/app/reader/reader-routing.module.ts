import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReaderComponent } from './reader.component';

const routes: Routes = [
  { path: ':id/:modul/:page', component: ReaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReaderRoutingModule {}
