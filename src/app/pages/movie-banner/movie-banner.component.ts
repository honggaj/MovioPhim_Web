import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-banner',
  standalone: false,
  templateUrl: './movie-banner.component.html',
  styleUrl: './movie-banner.component.css'
})
export class MovieBannerComponent {
  banners = [
    {
      slug: 'tougen-anki',
    name: 'Tougen Anki',
      poster_url: 'tougen-anki-poster.jpg',
  
    },
    {
      slug: 'gachiakuta',
   name: 'Gachiakuta',
      poster_url: 'gachiakuta-poster.jpg',
    
    },
    {
      slug: 'sat-thu-ve-vuon',
    name: 'Sát Thủ Về Vườn',
      poster_url: 'sat-thu-ve-vuon-poster.jpg',
    
    },
    {
      slug: 'khai-huyen-di-gioi-mynoghra-chinh-phuc-the-gioi-tu-nen-van-minh-suy-tan',
    name: 'Khai Huyền Di Giới: Mynoghra - Chinh Phục Thế Giới Từ Nền Văn Minh Suy Tàn',
      poster_url: 'khai-huyen-di-gioi-mynoghra-chinh-phuc-the-gioi-tu-nen-van-minh-suy-tan-poster.jpg',
    
    }
  ];

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 1, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  constructor(private router: Router) {}

  goToDetail(slug: string): void {
    this.router.navigate(['/movie-detail', slug]);
  }
}
