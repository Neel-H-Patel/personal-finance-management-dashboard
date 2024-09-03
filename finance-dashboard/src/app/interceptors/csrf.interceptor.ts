// csrf.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('csrftoken');
    console.log('CSRF Token:', csrfToken); // Add this line to log the token

    const modifiedReq = req.clone({
      headers: req.headers.set('X-CSRFToken', csrfToken || ''),
      withCredentials: true  // Include cookies in the request
    });

    return next.handle(modifiedReq);
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    console.log(`Cookie ${name} not found`);
    return null;
}
}
