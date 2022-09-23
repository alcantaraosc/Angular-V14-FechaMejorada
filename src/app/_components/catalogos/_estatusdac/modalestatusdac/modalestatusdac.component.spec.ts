import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalestatusdacComponent } from './modalestatusdac.component';

describe('ModalestatusdacComponent', () => {
  let component: ModalestatusdacComponent;
  let fixture: ComponentFixture<ModalestatusdacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalestatusdacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalestatusdacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
