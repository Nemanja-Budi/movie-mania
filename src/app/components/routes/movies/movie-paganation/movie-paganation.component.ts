import { Component, Input, inject } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

export type Sorting = {
  page: number;
  pageSize: number;
  sort: string;
  sortDirection: string;
}

@Component({
  selector: 'app-movie-paganation',
  templateUrl: './movie-paganation.component.html',
  styleUrls: ['./movie-paganation.component.css']
})
export class MoviePaganationComponent {
  movieService: MovieService = inject(MovieService);
  @Input() maxPages: number = 0;
  currentPage: number = 1;

  onGetPage(pages: number): void {
    this.currentPage += pages;
    this.movieService.selectSubject.next({
      ...this.movieService.selectSubject.value,
      page: this.movieService.selectSubject.value.page + pages
    })
  }

  onGetSortSelect(sortSelect: string): void {
    this.movieService.selectSubject.next({
      ...this.movieService.selectSubject.value,
      sort: sortSelect
    });
  }

  onGetButon(): void {
    this.movieService.selectSubject.next({
      ...this.movieService.selectSubject.value,
      sortDirection: this.movieService.selectSubject.value.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  }
 
}
