import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPlatilloComponent } from './actualizar-platillo.component';

describe('ActualizarPlatilloComponent', () => {
  let component: ActualizarPlatilloComponent;
  let fixture: ComponentFixture<ActualizarPlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarPlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
