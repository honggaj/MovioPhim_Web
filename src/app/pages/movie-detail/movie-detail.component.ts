// movie-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  slug: string = '';
  movie: any;
  castList: any[] = [];
  selectedEpisodeLink: string | null = null;
  showTrailer: boolean = false;
  currentSeasonIndex: number = 0;
  seasons: any[] = [];
  relatedMovies: any[] = [];
isLoading: boolean = true; // 🔄 Loading state

  responsiveOptions: any[] = [
    { breakpoint: '1024px', numVisible: 7, numScroll: 5 },
    { breakpoint: '768px', numVisible: 5, numScroll: 3 },
    { breakpoint: '560px', numVisible: 3, numScroll: 2 }
  ];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    const slug = params['slug'];
    this.loadMovieData(slug);
  });
}
loadMovieData(slug: string) {
  this.isLoading = true; // 👉 Bắt đầu loading

  this.movieService.getMovieDetail(slug).subscribe(res => {
    this.movie = res.data;
    this.initializeSeasons();
    this.isLoading = false; // ✅ Dừng loading

    // 🔁 Lấy slug thể loại đầu tiên
    const firstGenre = this.movie.breadCrumb?.find((b: any) =>
      b.slug?.includes('/the-loai')
    );
    if (firstGenre?.slug) {
      const genreSlug = firstGenre.slug.split('/').pop();
      this.loadRelatedMovies(genreSlug, slug);
    }
  });

  this.movieService.getMovieCast(slug).subscribe(res => {
    this.castList = res.data.peoples || [];
  });
}


  loadRelatedMovies(genreSlug: string, currentSlug: string) {
    this.movieService.getMoviesByGenre(genreSlug).subscribe(res => {
      this.relatedMovies = res.data.items.filter((m: any) => m.slug !== currentSlug).slice(0, 10); // loại trừ phim hiện tại
    });
  }


  initializeSeasons() {
    if (this.movie?.item?.episodes) {
      this.seasons = this.movie.item.episodes.map((season: any, index: number) => ({
        number: index + 1,
        name: season.server_name || `Mùa ${index + 1}`,
        episodes: season.server_data || []
      }));
    }
  }

  selectSeason(seasonNumber: number) {
    this.selectedEpisodeLink = null; // Reset episode selection
  }

  setEpisode(link: string) {
    this.selectedEpisodeLink = link;
    this.showTrailer = false;
  }

  toggleTrailer() {
    this.showTrailer = !this.showTrailer;
    this.selectedEpisodeLink = null;
  }

  getBreadCrumbNames(type: 'the-loai' | 'quoc-gia'): string {
    const items = this.movie?.breadCrumb?.filter((b: any) =>
      b.slug?.includes(`/${type}`)
    )?.map((b: any) => b.name);
    return items?.length ? items.join(', ') : 'Đang cập nhật';
  }

  onImgError = (event: Event): void => {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/no_image.png';
  }
  changeSeason(index: number) {
    this.currentSeasonIndex = index;
    this.selectedEpisodeLink = null; // Reset player khi đổi mùa
  }

}