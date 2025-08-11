import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-single-page',
  standalone: false,
  templateUrl: './movie-single-page.component.html',
  styleUrl: './movie-single-page.component.css'
})
export class MovieSinglePageComponent {
  movies: any[] = [];
  isLoading = true;

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;

  constructor(private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieService.getMoviesBySlug('phim-le').subscribe((res) => {
      console.log('📦 Full API response:', res);
      this.movies = res.data.items;
      this.isLoading = false; // ✅ done load
    });
  }

  goToDetail(slug: string): void {
    this.router.navigate(['/phim', slug]);
  }

  get paginatedMovies() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.movies.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.movies.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
