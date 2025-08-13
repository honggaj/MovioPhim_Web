import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

interface CacheEntry {
  timestamp: number;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://ophim1.com/v1/api';

  private cacheDuration = 5 * 60 * 1000; // 5 phút = 300000 ms

  private homeCache: CacheEntry | null = null;
  private moviesBySlugCache: { [slug: string]: CacheEntry } = {};
  private movieDetailCache: { [slug: string]: CacheEntry } = {};

  constructor(private http: HttpClient) {}

  private isCacheValid(cacheEntry: CacheEntry | null): boolean {
    if (!cacheEntry) return false;
    return (Date.now() - cacheEntry.timestamp) < this.cacheDuration;
  }

  getMovieHome(): Observable<any> {
    if (this.isCacheValid(this.homeCache)) {
      return of(this.homeCache!.data);
    } else {
      return this.http.get(`${this.baseUrl}/home`).pipe(
        tap(data => {
          this.homeCache = { timestamp: Date.now(), data };
        })
      );
    }
  }

  getHomeWithPoster(): Observable<any> {
    return this.getMovieHome().pipe(
      switchMap((res: any) => {
        const items = res.data.items;

        const detailRequests = items.map((movie: any) =>
          this.getMovieDetail(movie.slug).pipe(
            map((detail: any) => ({
              ...movie,
              poster_url: detail.data.item.poster_url,
              trailer_url: detail.data.item.trailer_url,
              quality: detail.data.item.quality,
              lang: detail.data.item.lang,
              type: detail.data.item.type,
              year: detail.data.item.year,
              view: detail.data.item.view,
              episode_current: detail.data.item.episode_current,
            }))
          )
        );

        return forkJoin(detailRequests);
      })
    );
  }

  getTopViewedMovies(slug = 'phim-le'): Observable<any[]> {
    return this.getMoviesBySlug(slug).pipe(
      map((res: any) => {
        const movies = res.data.items;
        return movies.sort((a: any, b: any) => (b.view || 0) - (a.view || 0));
      })
    );
  }

  getMoviesBySlug(slug: string): Observable<any> {
    const cacheEntry = this.moviesBySlugCache[slug];
    if (this.isCacheValid(cacheEntry)) {
      return of(cacheEntry!.data);
    } else {
      return this.http.get(`${this.baseUrl}/danh-sach/${slug}`).pipe(
        tap(data => {
          this.moviesBySlugCache[slug] = { timestamp: Date.now(), data };
        })
      );
    }
  }

  getTvShow(): Observable<any> {
    return this.getMoviesBySlug('tv-shows');
  }

  getPhimMoi(): Observable<any> {
    return this.getMoviesBySlug('phim-moi');
  }

  getPhimLe(): Observable<any> {
    return this.getMoviesBySlug('phim-le');
  }

  getPhimBo(): Observable<any> {
    return this.getMoviesBySlug('phim-bo');
  }

  getHoatHinh(): Observable<any> {
    return this.getMoviesBySlug('hoat-hinh');
  }

  searchMovies(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tim-kiem`, {
      params: { keyword },
    });
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/the-loai`);
  }

  getMoviesByGenre(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/the-loai/${slug}`);
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quoc-gia`);
  }

  getMoviesByCountry(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quoc-gia/${slug}`);
  }

  getMovieDetail(slug: string): Observable<any> {
    const cacheEntry = this.movieDetailCache[slug];
    if (this.isCacheValid(cacheEntry)) {
      return of(cacheEntry!.data);
    } else {
      return this.http.get(`${this.baseUrl}/phim/${slug}`).pipe(
        tap(data => {
          this.movieDetailCache[slug] = { timestamp: Date.now(), data };
        })
      );
    }
  }

  getMovieImages(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}/images`);
  }

  getMovieCast(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}/peoples`);
  }

  getMovieKeywords(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}/keywords`);
  }
}
