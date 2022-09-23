import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalliderComponent } from './modallider.component';

describe('ModalliderComponent', () => {
  let component: ModalliderComponent;
  let fixture: ComponentFixture<ModalliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
