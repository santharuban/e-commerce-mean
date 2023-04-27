import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { AuthGuard } from "./auth.guard";

describe("canActivate", () => {
  let router: Router;
  let toastrService: ToastrService;
  let authguard: AuthGuard;
  let localStorageSpy: jasmine.Spy;

  beforeEach(() => {
    router = jasmine.createSpyObj("Router", ["navigate"]);
    toastrService = jasmine.createSpyObj("ToastrService", ["info"]);
    authguard = new AuthGuard(router, toastrService);

    localStorageSpy = spyOn(localStorage, "getItem").and.callFake(
      (key: string) => {
        if (key === "user") {
          return "some_user_value";
        } else if (key === "Admin") {
          return "some_admin_value";
        } else if (key === "user1") {
          return "some_user1_value";
        } else {
          return null;
        }
      }
    );
  });

  it("should return true if user is present in local storage", () => {
    expect(authguard.canActivate()).toBeTrue();
    expect(localStorageSpy.calls.count()).toBe(1);
    expect(localStorageSpy.calls.argsFor(0)[0]).toBe("user");
  });

  it("should redirect to login and return false if user is not present in local storage", () => {
    localStorageSpy.and.returnValue(null);

    expect(authguard.canActivate()).toBeFalse();
    expect(localStorageSpy.calls.count()).toBe(1);
    expect(localStorageSpy.calls.argsFor(0)[0]).toBe("user");
    expect(toastrService.info).toHaveBeenCalledWith(
      "please login to order the product"
    );
    expect(router.navigate).toHaveBeenCalledWith(["/login"]);
  });
});
