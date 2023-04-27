import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastrService: ToastrService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const value = localStorage.getItem("user");
    const user = localStorage.getItem("Admin");

    if (value != null) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
