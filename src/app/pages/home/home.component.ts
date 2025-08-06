import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  keyword: string = '';

  constructor(private router: Router) {}

  onSearch() {
    if (this.keyword.trim()) {
      this.router.navigate(['/tim-kiem'], { queryParams: { q: this.keyword } });
    }
  }
}