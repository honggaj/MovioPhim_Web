import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-randome',
  standalone: false,
  templateUrl: './movie-randome.component.html',
  styleUrl: './movie-randome.component.css'
})
export class MovieRandomeComponent {
  constructor(private movieService: MovieService, private router: Router) {}

  goToRandomMovie() {
    this.movieService.getMoviesBySlug('hoat-hinh').subscribe((res) => {
      const movies = res.data.items;

      if (movies.length > 0) {
        const randomIndex = Math.floor(Math.random() * movies.length);
        const selectedMovie = movies[randomIndex];
        const slug = selectedMovie.slug || selectedMovie.slug_name;

        if (slug) {
          this.router.navigate(['/phim', slug]);
        } else {
          console.error('❌ Không có slug cho phim này:', selectedMovie);
        }
      } else {
        console.warn('❌ Danh sách phim rỗng!');
      }
    });
  }
}
