import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaoportunidadesComponent } from './listaoportunidades.component';

describe('ListaoportunidadesComponent', () => {
  let component: ListaoportunidadesComponent;
  let fixture: ComponentFixture<ListaoportunidadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaoportunidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaoportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
