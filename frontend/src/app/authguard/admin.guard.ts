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
export class AdminGuard implements CanActivate {
  constructor(private toastrService: ToastrService, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const value = localStorage.getItem("Admin");
    const user = localStorage.getItem("user");
    if (value != null) {
      return true;
    } else if (user != null) {
      this.toastrService.warning("unauthorized entry");
      return false;
    } else {
      this.toastrService.info("please login to access");
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
