import {Injectable} from '@angular/core';
import {CanActivate, UrlTree} from '@angular/router';
import {AuthService} from '@auth0/auth0-angular';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$;
  }

}
