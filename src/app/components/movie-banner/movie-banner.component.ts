import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-banner',
  standalone: false,
  templateUrl: './movie-banner.component.html',
  styleUrl: './movie-banner.component.css'
})
export class MovieBannerComponent {
  banners: any[] = [];
  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getHomeWithPoster().subscribe({
      next: (movies: any[]) => {
        this.banners = movies;
      },
      error: (err) => {
        console.error('Lỗi khi load banners:', err);
      }
    });
  }

  goToDetail(slug: string): void {
    this.router.navigate(['/phim', slug]);
  }
}
