import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MovieCardComponent } from './shared/movie-card/movie-card.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieBannerComponent } from './components/movie-banner/movie-banner.component';
import { SharedModule } from './shared/shared.module'; // ✅ Đúng nè!
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MovieCountryComponent } from './pages/movie-country/movie-country.component';
import { MovieRandomeComponent } from './pages/movie-randome/movie-randome.component';
import { LatestMovieListComponent } from './components/latest-movie-list/latest-movie-list.component';
import { MovieSingleComponent } from './components/movie-single/movie-single.component';
import { TopRateComponent } from './components/top-rate/top-rate.component';
import { MovieSeriesComponent } from './components/movie-series/movie-series.component';
import { MovieSeriesPageComponent } from './pages/movie-series-page/movie-series-page.component';
import { MovieSinglePageComponent } from './pages/movie-single-page/movie-single-page.component';
import { MovieCartoonPageComponent } from './pages/movie-cartoon-page/movie-cartoon-page.component';
import { CommonModule } from '@angular/common';
import { MovieGenrePageComponent } from './pages/movie-genre-page/movie-genre-page.component';
import { MovieTvShowsPageComponent } from './pages/movie-tv-shows-page/movie-tv-shows-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MovieCardComponent,
    HomeComponent,
    MovieDetailComponent,
    MovieBannerComponent,
    MovieGenrePageComponent,
    SearchPageComponent,
    MovieCountryComponent,
    MovieRandomeComponent,
    LatestMovieListComponent,
    MovieSingleComponent,
    TopRateComponent,
    MovieSeriesComponent,
    MovieSeriesPageComponent,
    MovieSinglePageComponent,
    MovieCartoonPageComponent,
    MovieTvShowsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CarouselModule,
    FormsModule, 
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
