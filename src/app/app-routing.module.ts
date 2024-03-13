import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './components/routes/movies/movies.component';
import { HomeComponent } from './components/routes/home/home.component';
import { AddMovieComponent } from './components/routes/add-movie/add-movie.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-movie', component: AddMovieComponent },
  // { path: 'train-detail/:id', component: TrainItemComponent },
  // { path: 'tickets-buy/:id', component: TicketFormComponent},
  // { path: "person/:personal_number", component: PersionDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
