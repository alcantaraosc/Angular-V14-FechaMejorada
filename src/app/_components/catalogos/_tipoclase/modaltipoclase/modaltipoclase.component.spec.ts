import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltipoclaseComponent } from './modaltipoclase.component';

describe('ModaltipoclaseComponent', () => {
  let component: ModaltipoclaseComponent;
  let fixture: ComponentFixture<ModaltipoclaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaltipoclaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltipoclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
