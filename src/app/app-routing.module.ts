import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { MovieGenreComponent } from './pages/movie-genre/movie-genre.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MovieCountryComponent } from './pages/movie-country/movie-country.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'tim-kiem', component: SearchPageComponent}, // trang tìm kiếm
  { path: 'phim/:slug', component: MovieDetailComponent },     // chi tiết phim
  { path: 'the-loai', component: MovieGenreComponent }, // theo thể loại
    { path: 'quoc-gia', component: MovieCountryComponent },     // chi tiết phim

  { path: '**', redirectTo: '' }                         // fallback nếu route không tồn tại
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
