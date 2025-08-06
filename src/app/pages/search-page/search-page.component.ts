import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search-page',
  standalone: false,
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})

export class SearchPageComponent {
  keyword: string = '';
  results: any[] = [];
  isLoading: boolean = false; // 🆕 biến loading

   rows: number = 12;
  currentPage: number = 1;
  totalPages: number = 1;
  pagesToShow: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  onSearch() {
    if (this.keyword.trim()) {
      this.router.navigate(['/tim-kiem'], { queryParams: { q: this.keyword } });
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['q'] || '';
      if (this.keyword.trim()) {
        this.isLoading = true; // 🆕 Bắt đầu loading
        this.movieService.searchMovies(this.keyword).subscribe(res => {
          this.results = res.data?.items || [];
          this.isLoading = false; // 🆕 Kết thúc loading
        });
      }
    });
  }
}