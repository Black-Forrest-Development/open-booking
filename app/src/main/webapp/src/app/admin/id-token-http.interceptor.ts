import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {mergeMap, Observable, take, tap} from 'rxjs';
import {AuthService} from "@auth0/auth0-angular";
import {catchError} from "rxjs/operators";
import {LoggingService} from "../shared/logging/logging.service";

@Injectable()
export class IdTokenHttpInterceptor implements HttpInterceptor {


  constructor(private service: AuthService, private logging: LoggingService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith('api/')) {
      return this.service.getIdTokenClaims()
        .pipe(
          mergeMap(token => {
            if (!token) return next.handle(req);
            this.logging.log(token.__raw + "")
            const clone = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token.__raw}`),
            })
            return next.handle(clone);
          })
        )
    }
    return next.handle(req);
  }
}
