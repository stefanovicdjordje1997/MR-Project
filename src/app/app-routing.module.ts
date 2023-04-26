import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/main/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/main/favorites/favorites.module').then(m => m.FavoritesPageModule)
  },
  {
    path: 'my-books',
    loadChildren: () => import('./pages/main/my-books/my-books.module').then(m => m.MyBooksPageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/start/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./auth/start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
