import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/routes/movies/movies.component';
import { HomeComponent } from './components/routes/home/home.component';
import { AddMovieComponent } from './components/routes/add-movie/add-movie.component';
import { MovieItemComponent } from './components/routes/movies/movie-item/movie-item.component';
import { MoviePaganationComponent } from './components/routes/movies/movie-paganation/movie-paganation.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HomeComponent,
    AddMovieComponent,
    MovieItemComponent,
    MoviePaganationComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
