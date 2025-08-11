import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-genre-page',
  standalone: false,
  templateUrl: './movie-genre-page.component.html',
  styleUrl: './movie-genre-page.component.css'
})
export class MovieGenrePageComponent implements OnInit{
  genres: any[] = [];
  movies: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 12;
  activeGenreSlug: string = '';
  pagesToShow: number[] = [];

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getGenres().subscribe((res) => {
      this.genres = res.data.items;

      this.route.params.subscribe((params) => {
        const slug = params['slug'];
        if (slug) {
          this.selectGenre(slug);
        } else if (this.genres.length > 0) {
          this.selectGenre(this.genres[0].slug);
        }
      });
    });
  }

  selectGenre(slug: string) {
    this.activeGenreSlug = slug;
    this.isLoading = true;
    this.currentPage = 1;

    this.movieService.getMoviesByGenre(slug).subscribe((res) => {
      this.movies = res.data?.items || [];
      this.updatePagination();
      this.isLoading = false;
    });
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
      this.updatePagination();
    }
  }

  updatePagination() {
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
