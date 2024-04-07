import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDataTableComponent } from './filter-data-table.component';

describe('FilterDataTableComponent', () => {
  let component: FilterDataTableComponent;
  let fixture: ComponentFixture<FilterDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDataTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
