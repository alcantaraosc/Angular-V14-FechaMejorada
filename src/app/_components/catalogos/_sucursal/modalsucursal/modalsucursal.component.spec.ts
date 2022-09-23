import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalsucursalComponent } from './modalsucursal.component';

describe('ModalsucursalComponent', () => {
  let component: ModalsucursalComponent;
  let fixture: ComponentFixture<ModalsucursalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalsucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalsucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
