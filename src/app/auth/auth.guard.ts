import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "./auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isUserAuthenticated) {
    return true;
  }

  if(!authService.isUserAuthenticated) {
    router.navigateByUrl('/log-in');
  }

  return authService.isUserAuthenticated;
}
