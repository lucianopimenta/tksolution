import { Injectable, NgModule} from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AlertService } from '../service/alert.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(public alert: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var url = 'http://localhost:5001/api/' + req.url;

    var dupReq: HttpRequest<any>;

      dupReq = req.clone({ 
        url: url
      });

    return next.handle(dupReq).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        
          return throwError(error);
    }));
  }
};
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
