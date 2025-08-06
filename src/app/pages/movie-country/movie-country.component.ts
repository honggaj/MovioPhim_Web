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
  pagedMovies: any[] = [];

  activeCountrySlug: string = '';
  currentPage = 1;
  rows = 10;
  totalPages = 0;
  pagesToShow: number[] = [];

  indicatorLeft = 0;
  indicatorWidth = 0;

  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieService.getCountries().subscribe((res) => {
      this.countries = res.data.items;
    });

    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.selectCountry(slug);
      }
    });
  }

  selectCountry(slug: string, btn?: HTMLElement) {
    this.activeCountrySlug = slug;

    if (btn) {
      this.indicatorLeft = btn.offsetLeft;
      this.indicatorWidth = btn.offsetWidth;
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    this.isLoading = true;
    this.currentPage = 1;

    this.movieService.getMoviesByCountry(slug).subscribe((res) => {
      this.movies = res.data?.items || [];
      this.updatePagination();
      this.isLoading = false;
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
