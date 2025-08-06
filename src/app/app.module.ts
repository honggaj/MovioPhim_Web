import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MovieCardComponent } from './shared/movie-card/movie-card.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { MovieSearchComponent } from './pages/movie-search/movie-search.component';
import { MovieGenreComponent } from './pages/movie-genre/movie-genre.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieListHomeComponent } from './pages/movie-list-home/movie-list-home.component';
import { MovieListNewComponent } from './pages/movie-list-new/movie-list-new.component';
import { MovieListSeriesComponent } from './pages/movie-list-series/movie-list-series.component';
import { MovieListAnimationComponent } from './pages/movie-list-animation/movie-list-animation.component';
import { MovieBannerComponent } from './pages/movie-banner/movie-banner.component';
import { SharedModule } from './shared/shared.module'; // ✅ Đúng nè!
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MovieCardComponent,
    HomeComponent,
    MovieDetailComponent,
    MovieSearchComponent,
    MovieListHomeComponent,
    MovieGenreComponent,
    MovieListNewComponent,
    MovieListSeriesComponent,
    MovieListAnimationComponent,
    MovieBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CarouselModule,
    FormsModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
