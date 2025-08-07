import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  slug: string = '';
  movie: any;
castList: any[] = []; // danh sách diễn viên
responsiveOptions: any[] = [
  {
    breakpoint: '1024px',
    numVisible: 5,
    numScroll: 3
  },
  {
    breakpoint: '768px',
    numVisible: 3,
    numScroll: 2
  },
  {
    breakpoint: '560px',
    numVisible: 2,
    numScroll: 1
  }
];
  selectedEpisodeLink: string | null = null;
  showTrailer: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService // xài service chứ đừng gọi http tay
  ) { }

 ngOnInit() {
  const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    // Lấy chi tiết phim
    this.movieService.getMovieDetail(slug).subscribe(res => {
      this.movie = res.data;
    });

    // Lấy danh sách diễn viên
    this.movieService.getMovieCast(slug).subscribe(res => {
      this.castList = res.data.peoples || [];
      console.log("🎭 Diễn viên:", this.castList);
    });
  }
}

  getBreadCrumbNames(type: 'the-loai' | 'quoc-gia'): string {
    const items = this.movie?.breadCrumb?.filter((b: any) =>
      b.slug?.includes(`/${type}`)
    )?.map((b: any) => b.name);

    return items?.length ? items.join(', ') : 'Đang cập nhật';
  }
  setEpisode(link: string) {
    this.selectedEpisodeLink = link;
    this.showTrailer = false; // Tắt trailer khi bật phim
  }

  toggleTrailer() {
    this.showTrailer = !this.showTrailer;
    this.selectedEpisodeLink = null; // Tắt phim khi bật trailer
  }
  onImgError(event: Event) {
  const imgElement = event.target as HTMLImageElement;
  imgElement.src = 'assets/images/no_image.png';
}


}