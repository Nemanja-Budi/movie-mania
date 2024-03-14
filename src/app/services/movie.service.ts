import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { MovieList } from '../models/movie-list';
import { Sorting } from '../components/routes/movies/movie-paganation/movie-paganation.component';
import { Genre } from '../models/genre.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  quearyParams: Sorting = {
    page: 1,
    pageSize: 6,
    sort: 'rating',
    sortDirection: 'asc'
  }

  selectSubject: BehaviorSubject<Sorting> = new BehaviorSubject<Sorting>(this.quearyParams);

  constructor(private http: HttpClient) { }

  getMovies(): Observable<MovieList> {
    return this.selectSubject.pipe(
      switchMap(params => {
        const options = {
          params: new HttpParams()
            .set('page', params.page || 1)
            .set('pageSize', params.pageSize || 5)
            .set('sort', params.sort || "")
            .set('sortDirection', params.sortDirection || "")
        };
        return this.http.get<MovieList>('http://localhost:3000/api/movies', options);
      })
    );
  }

  getMovie(movie_id: number): Observable<Movie> {
    return this.http.get<Movie>(`http://localhost:3000/api/movies/${movie_id}`).pipe(map((movie) => {
      return movie;
    }));
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`http://localhost:3000/api/movies`, movie);
  }

  editMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`http://localhost:3000/api/movies/${movie._id}`, movie);
  }

  deleteMovie(movie_id: number): Observable<Movie> {
    return this.http.delete<Movie>(`http://localhost:3000/api/movies/${movie_id}`);
  }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`http://localhost:3000/api/genres`).pipe(map((genre) => {
      return genre;
    }));
  }

  editGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`http://localhost:3000/api/genres`, genre)
  }


}
