import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tv-shows',
  standalone: false,
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css'
})
export class TvShowsComponent {
 movies: any[] = [];

  constructor(private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieService.getMoviesBySlug('tv-shows').subscribe((res) => {
      console.log('📦 Full API response:', res);
      this.movies = res.data.items;
      console.log('🎞️ Movies:', this.movies);
    });
  }
  goToDetail(slug: string): void {
    this.router.navigate(['/phim', slug]);

  }
}