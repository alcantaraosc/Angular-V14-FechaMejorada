import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpersonaldacComponent } from './modalpersonaldac.component';

describe('ModalpersonaldacComponent', () => {
  let component: ModalpersonaldacComponent;
  let fixture: ComponentFixture<ModalpersonaldacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpersonaldacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalpersonaldacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
