import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
  @Input() movie: Movie = new Movie();
  movieService: MovieService = inject(MovieService);

  @Output() deleteMovie: EventEmitter<number> = new EventEmitter();
  onDeleteMovie(movie_id: number): void {
    this.movieService.deleteMovie(movie_id).subscribe();
  }
}
