import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListallamadasvendedorComponent } from './listallamadasvendedor.component';

describe('ListallamadasvendedorComponent', () => {
  let component: ListallamadasvendedorComponent;
  let fixture: ComponentFixture<ListallamadasvendedorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListallamadasvendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListallamadasvendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
