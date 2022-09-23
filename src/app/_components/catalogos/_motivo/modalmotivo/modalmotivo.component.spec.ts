import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmotivoComponent } from './modalmotivo.component';

describe('ModalmotivoComponent', () => {
  let component: ModalmotivoComponent;
  let fixture: ComponentFixture<ModalmotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalmotivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
