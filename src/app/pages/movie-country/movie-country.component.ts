import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-country',
  standalone: false,
  templateUrl: './movie-country.component.html',
  styleUrls: ['./movie-country.component.css']
})
export class MovieCountryComponent implements OnInit {
  countries: any[] = [];
   movies: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 12;
  activeCountrySlug: string = '';
  pagesToShow: number[] = [];

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
   this.movieService.getCountries().subscribe((res) => {
  this.countries = res.data.items; // ✅ Gán đúng vào biến countries

  this.route.params.subscribe((params) => {
    const slug = params['slug'];
    if (slug) {
      this.selectCountry(slug);
    } else if (this.countries.length > 0) {
      this.selectCountry(this.countries[0].slug);
    }
  });
});

  }

  selectCountry(slug: string) {
    this.activeCountrySlug = slug;
    this.isLoading = true;
    this.currentPage = 1;

    this.movieService.getMoviesByCountry(slug).subscribe((res) => {
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
