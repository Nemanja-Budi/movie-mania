import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { MovieList } from '../models/movie-list';
import { Sorting } from '../components/routes/movies/movie-paganation/movie-paganation.component';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  selectSubject: BehaviorSubject<Sorting> = new BehaviorSubject<Sorting>({ sort: 'rating', sortDirection: 'asc' });

  constructor(private http: HttpClient) { }

  getMovies(): Observable<MovieList> {
    return this.selectSubject.pipe(
      switchMap(params => {
        const options = {
          params: new HttpParams()
            .set('sort', params.sort || "")
            .set('sortDirection', params.sortDirection || "")
        };
        return this.http.get<MovieList>('http://localhost:3000/api/movies', options);
      })
    );
  }
  // selectSubject: BehaviorSubject<Sorting> = new BehaviorSubject<Sorting>({ sort: 'rating', sortDirection: 'asc' });

  // constructor(private http: HttpClient) { }

  // getMovies(params?: any): Observable<MovieList> {
  //   let options = {}
  //   if (params) {
  //     options = {
  //       params: new HttpParams()
  //         // .set('page', params.page || 1)
  //         // .set('pageSize', params.pageSize || 5)
  //         .set('sort', params.sort || "")
  //         .set('sortDirection', params.sortDirection || "")
  //       // .set('filter', params.filter && JSON.stringify(params.filter) || "")
  //     }
  //   }
  //   return this.http.get<MovieList>(`http://localhost:3000/api/movies`, options).pipe(map((movies) => {
  //     return movies
  //   }));
  // }
}
