import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPlatilloComponent } from './registrar-platillo.component';

describe('RegistrarPlatilloComponent', () => {
  let component: RegistrarPlatilloComponent;
  let fixture: ComponentFixture<RegistrarPlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarPlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
