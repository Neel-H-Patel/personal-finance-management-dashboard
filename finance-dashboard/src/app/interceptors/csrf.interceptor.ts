// csrf.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('All cookies:', document.cookie);  // Log all cookies
    const csrfToken = this.getCookie('csrftoken');
    console.log('CSRF Token:', csrfToken); // Add this line to log the token

    const modifiedReq = req.clone({
      headers: req.headers.set('X-CSRFToken', csrfToken || ''),
      withCredentials: true  // Include cookies in the request
    });

    return next.handle(modifiedReq);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    const value = match ? decodeURIComponent(match[2]) : null;
    console.log(`Cookie ${name} value: ${value}`);  // Log the cookie value
    return value;
  }
}
