import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-movie-list',
  standalone: false,
  templateUrl: './latest-movie-list.component.html',
  styleUrls: ['./latest-movie-list.component.css']
})
export class LatestMovieListComponent implements OnInit {

   movies: any[] = [];
   isLoading: boolean = true;
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  constructor(private movieService: MovieService, private router: Router) {}

ngOnInit() {
  this.isLoading = true;
  this.movieService.getMoviesBySlug('phim-moi').subscribe((res) => {
    this.movies = res.data.items;
    this.isLoading = false;
  });
}


  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
 loadMore() {
  // ví dụ gọi thêm API hoặc tăng page...
  console.log('Đang load thêm phim...');
}
  
}