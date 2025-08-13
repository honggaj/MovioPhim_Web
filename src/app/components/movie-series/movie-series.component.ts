import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-series',
  standalone: false,
  templateUrl: './movie-series.component.html',
  styleUrl: './movie-series.component.css'
})
export class MovieSeriesComponent {
  movies: any[] = [];
  isLoading = true;

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieService.getMoviesBySlug('phim-bo').subscribe((res) => {
      console.log('📦 Full API response:', res);
      this.movies = res.data.items;
      this.isLoading = false; // ✅ done load
    });
  }

  goToDetail(slug: string): void {
    this.router.navigate(['/phim', slug]);
  }
  loadMore() {
    this.router.navigate(['/phim-bo']);

  }
}