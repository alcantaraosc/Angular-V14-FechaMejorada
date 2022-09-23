import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltiposexoComponent } from './modaltiposexo.component';

describe('ModaltiposexoComponent', () => {
  let component: ModaltiposexoComponent;
  let fixture: ComponentFixture<ModaltiposexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaltiposexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltiposexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
