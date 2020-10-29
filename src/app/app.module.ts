import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { BukuCardComponent } from './buku-card/buku-card.component';

const material = [
  MatToolbarModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    BukuCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    ...material,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
