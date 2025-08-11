import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service'; // nhớ import dịch vụ này

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  keyword: string = '';
  filteredSuggestions: any[] = [];

  constructor(private router: Router, private movieService: MovieService) { }

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
    // Chọn phim => chuyển trang chi tiết phim
    this.router.navigate(['/phim', movie.slug]);
    this.filteredSuggestions = [];
    this.keyword = movie.title; // cập nhật input text là tên phim đã chọn
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


}
