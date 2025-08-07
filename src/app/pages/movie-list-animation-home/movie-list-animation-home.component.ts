import { Component, ElementRef, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-list-animation-home',
  standalone: false,
  templateUrl: './movie-list-animation-home.component.html',
  styleUrls: ['./movie-list-animation-home.component.css'],
})
export class MovieListAnimationHomeComponent {
   movies: any[] = [];

  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getMoviesBySlug('hoat-hinh').subscribe((res) => {
      this.movies = res.data.items;
    });
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  
}