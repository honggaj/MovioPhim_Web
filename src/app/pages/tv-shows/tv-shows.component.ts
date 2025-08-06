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
currentPage: number = 1;
itemsPerPage: number = 12;
isLoading = true;
  constructor(private movieService: MovieService,
    private router: Router
  ) { }

 ngOnInit() {
  this.movieService.getMoviesBySlug('tv-shows').subscribe((res) => {
    console.log('📦 Full API response:', res);
    this.movies = res.data.items;

    // 🕒 Cho Angular render skeleton trước 1 tí rồi mới set false
    setTimeout(() => {
      this.isLoading = false;
    }, 200); // 200ms là đủ để thấy skeleton nháy
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