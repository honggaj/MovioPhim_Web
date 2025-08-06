import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-genre',
  standalone: false,
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.css'],
})
export class MovieGenreComponent implements OnInit {
  genres: any[] = [];
  movies: any[] = [];
  pagedMovies: any[] = [];

  activeGenreSlug: string = '';

  // Phân trang
  currentPage = 1;
  rows = 10;
  totalPages = 0;
  pagesToShow: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((res) => {
      this.genres = res.data.items;
    });

    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.selectGenre(slug);
      }
    });
  }

  selectGenre(slug: string) {
    this.activeGenreSlug = slug;
    this.currentPage = 1;
    this.movieService.getMoviesByGenre(slug).subscribe((res) => {
      this.movies = res.data?.items || [];
      this.updatePagination();
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.movies.length / this.rows);

    const start = (this.currentPage - 1) * this.rows;
    const end = start + this.rows;
    this.pagedMovies = this.movies.slice(start, end);

    const visiblePages = 5;
    let startPage = Math.max(this.currentPage - Math.floor(visiblePages / 2), 1);
    let endPage = startPage + visiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - visiblePages + 1, 1);
    }

    this.pagesToShow = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pagesToShow.push(i);
    }
  }
}
