import { Component, inject } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

export type Sorting = {
  sort: string;
  sortDirection: string;
}

@Component({
  selector: 'app-movie-paganation',
  templateUrl: './movie-paganation.component.html',
  styleUrls: ['./movie-paganation.component.css']
})
export class MoviePaganationComponent {
  sortDirection: string = 'asc'
  sort: string = 'rating'

  movieService: MovieService = inject(MovieService);

  onGetSortSelect(sortSelect: string): void {
    this.sort = sortSelect;
    this.movieService.selectSubject.next({ sort: sortSelect, sortDirection: this.sortDirection });
  }

  onGetButon(): void {
    this.sortDirection == 'asc' ? this.sortDirection = 'desc' : this.sortDirection = 'asc';
    this.movieService.selectSubject.next({ sort: this.sort, sortDirection: this.sortDirection });
  }
}
