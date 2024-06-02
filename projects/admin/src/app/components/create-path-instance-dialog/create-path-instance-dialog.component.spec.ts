import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePathInstanceDialogComponent } from './create-path-instance-dialog.component';

describe('CreatePathInstanceDialogComponent', () => {
  let component: CreatePathInstanceDialogComponent;
  let fixture: ComponentFixture<CreatePathInstanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePathInstanceDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePathInstanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
