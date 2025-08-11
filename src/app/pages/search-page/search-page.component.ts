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
  filteredSuggestions: any[] = [];
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['q'] || '';
      if (this.keyword.trim()) {
        this.loadResults(this.keyword);
      }
    });
  }

  onKeywordChange() {
    const kw = this.keyword.trim();
    if (kw.length > 0) {
      this.movieService.searchMovies(kw).subscribe(res => {
        this.filteredSuggestions = res.data?.items || [];
      });
    } else {
      this.filteredSuggestions = [];
    }
  }

  selectSuggestion(movie: any) {
    this.router.navigate(['/phim', movie.slug]);
    this.filteredSuggestions = [];
    this.keyword = movie.name;
  }

onSearch() {
  const kw = this.keyword.trim();
  if (kw.length > 0) {
    this.router.navigate(['/tim-kiem'], { queryParams: { q: kw } });
    this.filteredSuggestions = [];
  } else {
    // keyword trống => về trang home luôn
    this.router.navigate(['/']);
    this.filteredSuggestions = [];
  }
}


  loadResults(keyword: string) {
    this.isLoading = true;
    this.movieService.searchMovies(keyword).subscribe(res => {
      this.results = res.data?.items || [];
      this.isLoading = false;
    });
  }
}
