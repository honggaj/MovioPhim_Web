import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'https://ophim1.com/v1/api';

  constructor(private http: HttpClient) { }

  // Trang chủ
  getHome(): Observable<any> {
    return this.http.get(`${this.baseUrl}/home`);
  }

  // Danh sách phim theo slug (vd: phim-moi, phim-le, phim-bo, hoat-hinh,...)
  getMoviesBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/danh-sach/${slug}`);
  }
  getTvShow(): Observable<any> {
    return this.getMoviesBySlug('tv-shows');
  }
  // Shortcut cho từng loại
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
  // Tìm kiếm phim theo từ khoá
  searchMovies(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tim-kiem`, {
      params: { keyword },
    });
  }

  // Danh sách thể loại
  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/the-loai`);
  }

  // Danh sách phim theo thể loại
  getMoviesByGenre(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/the-loai/${slug}`);
  }

  // Danh sách quốc gia
  getCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quoc-gia`);
  }

  // Danh sách phim theo quốc gia
  getMoviesByCountry(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/quoc-gia/${slug}`);
  }


  // Lấy thông tin phim
  getMovieDetail(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}`);
  }

  // Hình ảnh phim
  getMovieImages(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}/images`);
  }

  // Diễn viên phim
  getMovieCast(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}/peoples`);
  }

  // Từ khóa liên quan
  getMovieKeywords(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phim/${slug}/keywords`);
  }
}
