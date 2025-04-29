import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'adicionar-veiculo',
    loadComponent: () => import('./adicionar-veiculo/adicionar-veiculo.page').then( m => m.AdicionarVeiculoPage)
  },
  {
    path: 'editar',
    loadComponent: () => import('./editar/editar.page').then( m => m.EditarPage)
  },
];
