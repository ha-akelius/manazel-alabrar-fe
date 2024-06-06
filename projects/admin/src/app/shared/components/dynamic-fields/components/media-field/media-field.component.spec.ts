import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFieldComponent } from './media-field.component';

describe('MediaFieldComponent', () => {
  let component: MediaFieldComponent;
  let fixture: ComponentFixture<MediaFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
