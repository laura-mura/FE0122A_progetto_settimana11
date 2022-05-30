import { Movies } from './../../movies';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.scss']
})
export class HomeMoviesComponent implements OnInit {

  movies: Movies[] = [];
  yetToWatchMovies: Movies[] = [];
  watchedMovies: Movies[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((movies) => this.movies = movies);
  }

  ngDoCheck(): void{
    if (this.movies.length && !this.watchedMovies.length) {
      this.yetToWatchMovies = this.movies.filter((m) => !m.isFav && !m.isWatched );
      this.watchedMovies = this.movies.filter((m) => m.isWatched );
    }
  }

  onFavClick(movie: Movies): void {
    this.moviesService.updateMovie({...movie, isFav: !movie.isFav, isWatched: movie.isFav ? true : movie.isWatched })
    .subscribe((updateMovie) => {
      if (updateMovie.isWatched){
      const alreadyWatched = this.watchedMovies.find(movie => movie.id === updateMovie.id);
      if(alreadyWatched) {
        alreadyWatched.isFav = updateMovie.isFav
        this.watchedMovies = this.watchedMovies.map((m) => {
          if (m.id === updateMovie.id) {
            return updateMovie;
          }
          return m;
        })
      } else {
        this.watchedMovies.push(updateMovie);
      }
      this.yetToWatchMovies = this.yetToWatchMovies.filter((m) => m.id !== updateMovie.id);
    }
    })

  }
  onWatchedClick(movie: Movies): void {
    const payloadMovie = {...movie, isWatched: !movie.isWatched };
    payloadMovie.isFav = payloadMovie.isWatched ? payloadMovie.isFav : false;
    this.moviesService.updateMovie(payloadMovie).subscribe((updateMovie) => {
      if (updateMovie.isWatched) {
        this.watchedMovies.push(updateMovie);
        this.yetToWatchMovies = this.yetToWatchMovies.filter((m) => m.id !== updateMovie.id)
      } else {
        this.watchedMovies = this.watchedMovies.filter((m) => m.id !== updateMovie.id);
        this.yetToWatchMovies.push(updateMovie);
      }
    });
  }

}
