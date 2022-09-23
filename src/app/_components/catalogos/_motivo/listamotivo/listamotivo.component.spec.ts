import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListamotivoComponent } from './listamotivo.component';

describe('ListamotivoComponent', () => {
  let component: ListamotivoComponent;
  let fixture: ComponentFixture<ListamotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListamotivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListamotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
