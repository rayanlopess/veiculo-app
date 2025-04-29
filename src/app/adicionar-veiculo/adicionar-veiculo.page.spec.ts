import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarVeiculoPage } from './adicionar-veiculo.page';

describe('AdicionarVeiculoPage', () => {
  let component: AdicionarVeiculoPage;
  let fixture: ComponentFixture<AdicionarVeiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarVeiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
