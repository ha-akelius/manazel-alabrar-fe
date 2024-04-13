import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationLinkComponent } from './relation-link.component';

describe('RelationLinkComponent', () => {
  let component: RelationLinkComponent;
  let fixture: ComponentFixture<RelationLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationLinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
