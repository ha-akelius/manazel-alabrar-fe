import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowActionsComponent } from './row-actions.component';

describe('RowActionsComponent', () => {
  let component: RowActionsComponent;
  let fixture: ComponentFixture<RowActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
