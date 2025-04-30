import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'veiculos',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'veiculos',
    pathMatch: 'full',
  },
  {
    path: 'adicionar',
    loadComponent: () => import('./adicionar-veiculo/adicionar-veiculo.page').then( m => m.AdicionarVeiculoPage)
  }
];
