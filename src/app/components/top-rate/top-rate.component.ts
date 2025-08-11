import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-top-rate',
  standalone: false,
  templateUrl: './top-rate.component.html',
  styleUrl: './top-rate.component.css'
})
export class TopRateComponent {
  movies: any[] = [];
  isLoading = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    // Lấy phim theo slug ví dụ 'phim-moi' rồi sort điểm đánh giá IMDb giảm dần
    this.movieService.getMoviesBySlug('phim-moi').subscribe(res => {
      const items = res.data.items;
      this.movies = items.sort((a: any, b: any) => {
        const aRate = a.imdb?.vote_average || 0;
        const bRate = b.imdb?.vote_average || 0;
        return bRate - aRate;
      });
      this.isLoading = false;
    });
  }
}