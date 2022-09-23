import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbuscarllamadasvendedorComponent } from './modalbuscarllamadasvendedor.component';

describe('ModalbuscarllamadasvendedorComponent', () => {
  let component: ModalbuscarllamadasvendedorComponent;
  let fixture: ComponentFixture<ModalbuscarllamadasvendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalbuscarllamadasvendedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbuscarllamadasvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
