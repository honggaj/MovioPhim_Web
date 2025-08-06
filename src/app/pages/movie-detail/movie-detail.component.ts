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
  selectedEpisodeLink: string | null = null;
showTrailer: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService // xài service chứ đừng gọi http tay
  ) {}
  ngOnInit() {
  const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    this.movieService.getMovieDetail(slug).subscribe(res => {
      console.log("📦 Chi tiết phim nè:", res);

      // ✅ Gán đúng path: res.data.item
      this.movie = res.data;
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

}