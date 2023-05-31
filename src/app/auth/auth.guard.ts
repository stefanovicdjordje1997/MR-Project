import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";
import {take, tap} from "rxjs";

export const authGuard = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isUserAuthenticated.pipe(take(1), tap((isAuthenticated) => {
    if (!isAuthenticated) {
      router.navigateByUrl('/log-in')
    }
  }))
}
