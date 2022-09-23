import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuSidenavComponent } from './menu-sidenav.component';

describe('MenuSidenavComponent', () => {
  let component: MenuSidenavComponent;
  let fixture: ComponentFixture<MenuSidenavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
