import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-single',
  standalone: false,
  templateUrl: './movie-single.component.html',
  styleUrl: './movie-single.component.css'
})
export class MovieSingleComponent {
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
  loadMore() {
  // ví dụ gọi thêm API hoặc tăng page...
this.router.navigate(['/phim-le']);

}

}
