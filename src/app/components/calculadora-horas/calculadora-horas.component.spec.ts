import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraHorasComponent } from './calculadora-horas.component';

describe('CalculadoraHorasComponent', () => {
  let component: CalculadoraHorasComponent;
  let fixture: ComponentFixture<CalculadoraHorasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculadoraHorasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
