import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationComponent } from './relation.component';

describe('RelationComponent', () => {
  let component: RelationComponent;
  let fixture: ComponentFixture<RelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      imports: [RelationComponent]
    })
    .compileComponents();
    
=======
      imports: [RelationComponent],
    }).compileComponents();

>>>>>>> Stashed changes
    fixture = TestBed.createComponent(RelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
