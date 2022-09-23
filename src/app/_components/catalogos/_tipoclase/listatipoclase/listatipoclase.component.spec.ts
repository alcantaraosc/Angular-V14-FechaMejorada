import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatipoclaseComponent } from './listatipoclase.component';

describe('ListatipoclaseComponent', () => {
  let component: ListatipoclaseComponent;
  let fixture: ComponentFixture<ListatipoclaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListatipoclaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatipoclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
