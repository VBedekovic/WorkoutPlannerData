import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { DatatableComponent } from './components/datatable/datatable.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'datatable', component: DatatableComponent },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DatatableComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
