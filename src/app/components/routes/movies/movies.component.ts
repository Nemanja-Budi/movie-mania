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
  maxPages: number = 0;
  movieService: MovieService = inject(MovieService);

  movies: Observable<Movie[]> = this.movieService.getMovies().pipe(map((movies) => {
    this.maxPages =  Math.ceil(movies.count / this.movieService.selectSubject.value.pageSize);
    return movies.results;
  }));

  onDeleteMovie(eventID: number): void {
    
  }

}
