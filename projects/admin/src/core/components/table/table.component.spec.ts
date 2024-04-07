import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRecord } from './table';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent<BasicRecord>;
  let fixture: ComponentFixture<TableComponent<BasicRecord>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
