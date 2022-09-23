import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalestatusfinancieroComponent } from './modalestatusfinanciero.component';

describe('ModalestatusfinancieroComponent', () => {
  let component: ModalestatusfinancieroComponent;
  let fixture: ComponentFixture<ModalestatusfinancieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalestatusfinancieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalestatusfinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
