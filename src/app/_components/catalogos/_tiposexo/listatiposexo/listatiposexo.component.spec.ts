import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatiposexoComponent } from './listatiposexo.component';

describe('ListatiposexoComponent', () => {
  let component: ListatiposexoComponent;
  let fixture: ComponentFixture<ListatiposexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListatiposexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatiposexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
