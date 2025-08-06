import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list-animation',
  standalone: false,
  templateUrl: './movie-list-animation.component.html',
  styleUrl: './movie-list-animation.component.css'
})
export class MovieListAnimationComponent {
 movies: any[] = [];
responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 2,
    numScroll: 1
  }
];


  constructor(private movieService: MovieService,
    private router: Router
  ) {}

ngOnInit() {
  this.movieService.getMoviesBySlug('hoat-hinh').subscribe((res) => {
    console.log('📦 Full API response:', res);
    this.movies = res.data.items;
    console.log('🎞️ Movies:', this.movies);
  });
}
goToDetail(slug: string): void {
  this.router.navigate(['/phim', slug]);

}
}
