// csrf.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the CSRF token from cookies
    const csrfToken = this.getCookie('csrftoken');
    
    // Clone the request to add the CSRF token to the headers
    const modifiedReq = req.clone({
      headers: req.headers.set('X-CSRFToken', csrfToken || ''), // Handle missing token with an empty string
      withCredentials: true  // Include cookies in the request
    });

    return next.handle(modifiedReq);
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
    return match ? match[2] : null;
  }
}