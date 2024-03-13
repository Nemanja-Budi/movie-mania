import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';

import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {

  movieService: MovieService = inject(MovieService);
  movies: Observable<Movie[]> = this.movieService.getMovies().pipe(map((movies) => movies.results));


}
