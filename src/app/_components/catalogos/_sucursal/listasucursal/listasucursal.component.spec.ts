import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListasucursalComponent } from './listasucursal.component';

describe('ListasucursalComponent', () => {
  let component: ListasucursalComponent;
  let fixture: ComponentFixture<ListasucursalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
