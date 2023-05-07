import {inject, Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  authService = inject(AuthService);
  router = inject(Router);
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!this.authService.isUserAuthenticated){
      this.router.navigateByUrl('/log-in')
    }
    return this.authService.isUserAuthenticated
  }
}
