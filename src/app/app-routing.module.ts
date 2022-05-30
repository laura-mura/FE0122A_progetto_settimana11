import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { AddMoviesComponent } from './components/add-movies/add-movies.component';

const routes: Routes = [
  { path: '', component: HomeMoviesComponent },
  { path: 'add-movies', component: AddMoviesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
