import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavListComponent } from './user-sidenav-list.component';

describe('UserSidenavListComponent', () => {
  let component: UserSidenavListComponent;
  let fixture: ComponentFixture<UserSidenavListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserSidenavListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
