import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MovieCountryComponent } from './pages/movie-country/movie-country.component';
import { MovieCartoonPageComponent } from './pages/movie-cartoon-page/movie-cartoon-page.component';
import { MovieGenrePageComponent } from './pages/movie-genre-page/movie-genre-page.component';
import { MovieTvShowsPageComponent } from './pages/movie-tv-shows-page/movie-tv-shows-page.component';
import { MovieSeriesPageComponent } from './pages/movie-series-page/movie-series-page.component';
import { MovieSinglePageComponent } from './pages/movie-single-page/movie-single-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tim-kiem', component: SearchPageComponent }, // trang tìm kiếm
  { path: 'phim/:slug', component: MovieDetailComponent },     // chi tiết phim
  { path: 'the-loai', component: MovieGenrePageComponent }, // theo thể loại
  { path: 'quoc-gia', component: MovieCountryComponent },     // chi tiết phim
  { path: 'tv-shows', component: MovieTvShowsPageComponent }, // trang TV Shows
  { path: 'anime', component: MovieCartoonPageComponent }, // trang TV Shows
  { path: 'phim-bo', component: MovieSeriesPageComponent }, // trang TV Shows
  { path: 'phim-le', component: MovieSinglePageComponent }, // trang TV Shows


  { path: '**', redirectTo: '' }                         // fallback nếu route không tồn tại
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
