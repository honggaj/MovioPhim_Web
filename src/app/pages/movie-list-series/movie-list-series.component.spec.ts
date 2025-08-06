import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListSeriesComponent } from './movie-list-series.component';

describe('MovieListSeriesComponent', () => {
  let component: MovieListSeriesComponent;
  let fixture: ComponentFixture<MovieListSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
