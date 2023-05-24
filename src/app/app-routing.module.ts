import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/main/home/home.module').then(m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/main/favorites/favorites.module').then(m => m.FavoritesPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'my-books',
    loadChildren: () => import('./pages/main/my-books/my-books.module').then(m => m.MyBooksPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'log-in',
    loadChildren: () => import('./auth/start/log-in/log-in.module').then(m => m.LogInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/start/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./auth/start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
