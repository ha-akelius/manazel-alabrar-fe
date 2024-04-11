import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsSharedComponent } from './lms-shared.component';

describe('LmsSharedComponent', () => {
  let component: LmsSharedComponent;
  let fixture: ComponentFixture<LmsSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmsSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LmsSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
