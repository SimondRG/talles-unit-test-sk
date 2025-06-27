import { Routes } from '@angular/router';

export const routes: Routes = [

  // {
  //   path: 'pokemons',
  //   loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  // },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
  }

];
