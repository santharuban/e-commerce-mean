import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken =
      localStorage.getItem("user") || localStorage.getItem("Admin");
    const authReq = request.clone({
      headers: new HttpHeaders().set("authorization", `${accessToken}`),
    });
    return next.handle(authReq);
  }
}
