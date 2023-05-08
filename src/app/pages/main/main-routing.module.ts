import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import {authGuard} from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: 'books',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [authGuard]
      },
      {
        path: 'favorites',
        loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule),
        canActivate: [authGuard]
      },
      {
        path: 'my-books',
        loadChildren: () => import('./my-books/my-books.module').then(m => m.MyBooksPageModule),
        canActivate: [authGuard]
      },
      {
        path: '',
        redirectTo: '/main/books/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main/books/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
