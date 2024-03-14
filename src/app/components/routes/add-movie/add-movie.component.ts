import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, filter, map, of, startWith, switchMap } from 'rxjs';
import { Genre } from 'src/app/models/genre.model';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieService: MovieService = inject(MovieService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  movieForm: FormGroup;
  genreForm: FormGroup;

  isShown: boolean = false;
  editingMode: boolean = false;

  movieID: string | null = null;
  genres: Observable<Genre[]> = this.movieService.getGenres();

  constructor(private formBuilder: FormBuilder) {
    this.movieForm = this.formBuilder.group({
      _id: 0,
      name: ['',Validators.required],
      description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(250)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      rating: ['',Validators.required],
      duration: ['',Validators.required],
      director: ['',Validators.required],
      genre: ['',Validators.required],
    });

    this.genreForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onGetID(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.movieID = param.get('id');
    });
  }

  onGetMovie(): void {
    this.movieService.getMovie(Number(this.movieID)).pipe(
      concatMap((value) => {
        this.movieForm.patchValue(value);
        return this.genres.pipe(map((genre) => genre.filter((g) => g.name === value.genre)));
      }))
      .subscribe((value) => {
        this.genres = of(value);
      }
    );
  }


  onAddGenre(): void {
    if (!this.genreForm.valid) return;
    const newGenre = new Genre(this.genreForm.value);
    this.movieService.editGenre(newGenre).subscribe((value) => {
        this.movieForm.patchValue({
            genre: value.name
        });
        if(!this.editingMode) {
          this.genres = this.movieService.getGenres();
          this.genreForm.reset();
        }
        else {
          this.genres = of([value]);
          this.genreForm.reset();
        }
       
    });
  }

  onSubmit(): void {
    if(!this.movieForm.valid) return;
    if(!this.editingMode) {
      const newMovie = new Movie(this.movieForm.value);
      this.movieService.addMovie(newMovie).subscribe((value) => {
        this.movieForm.reset();
      });
    }
    else {
      const editedMovie = new Movie(this.movieForm.value);
      this.movieService.editMovie(editedMovie).subscribe((value) => {
        console.log(value);
        this.movieForm.reset();
        this.editingMode = false;
      });
    }
  }

 

  showGenreForm(): void {
    this.isShown = !this.isShown;
  }

  ngOnInit(): void {
    this.onGetID();
    if(this.movieID !== null) {
      this.editingMode = true;
      this.onGetMovie();
    }
  }

}
