import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list-new',
  standalone: false,
  templateUrl: './movie-list-new.component.html',
  styleUrl: './movie-list-new.component.css'
})
export class MovieListNewComponent {
  movies: any[] = [];
  // responsiveOptions = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 4,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3,
  //     numScroll: 1
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 2,
  //     numScroll: 1
  //   }
  // ];


  constructor(private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.movieService.getMoviesBySlug('phim-le').subscribe((res) => {
      console.log('📦 Full API response:', res);
      this.movies = res.data.items;
      console.log('🎞️ Movies:', this.movies);
    });
  }
  goToDetail(slug: string): void {
    this.router.navigate(['/movie-detail', slug]);

  }
}