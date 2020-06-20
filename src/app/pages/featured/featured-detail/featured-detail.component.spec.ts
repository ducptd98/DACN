import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedDetailComponent } from './featured-detail.component';

describe('FeaturedDetailComponent', () => {
  let component: FeaturedDetailComponent;
  let fixture: ComponentFixture<FeaturedDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
