import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityGalleryComponent } from './comunity-gallery.component';

describe('ComunityGalleryComponent', () => {
  let component: ComunityGalleryComponent;
  let fixture: ComponentFixture<ComunityGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComunityGalleryComponent]
    });
    fixture = TestBed.createComponent(ComunityGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
