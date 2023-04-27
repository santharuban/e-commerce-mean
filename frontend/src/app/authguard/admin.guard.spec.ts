import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AdminGuard } from "./admin.guard";

describe("canActivate", () => {
  let adminguard: AdminGuard;
  let toastrService: ToastrService;
  let router: Router;
  let localStorageSpy: jasmine.Spy;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj("ToastrService", ["info", "warning"]);
    router = jasmine.createSpyObj("Router", ["navigate"]);

    adminguard = new AdminGuard(toastrService, router);

    localStorageSpy = spyOn(localStorage, "getItem").and.callFake(
      (key: string) => {
        if (key === "Admin") {
          return "admin_token";
        } else if (key === "user") {
          return "user_token";
        } else {
          return null;
        }
      }
    );
  });

  it("should return true and not show any toastr message or navigate to login page if Admin token is present", () => {
    expect(adminguard.canActivate()).toBeTrue();
    expect(localStorageSpy).toHaveBeenCalledWith("Admin");
    expect(toastrService.info).not.toHaveBeenCalled();
    expect(toastrService.warning).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it("should show a warning toastr message and return false if user token is present", () => {
    localStorageSpy.and.returnValue("user_token");

    expect(adminguard.canActivate()).toBeFalse();
    expect(localStorageSpy).toHaveBeenCalledWith("Admin");
    expect(localStorageSpy).toHaveBeenCalledWith("user");
    expect(toastrService.warning).toHaveBeenCalledWith("unauthorized entry");
    expect(toastrService.info).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it("should show an info toastr message and navigate to login page and return false if no token is present", () => {
    localStorageSpy.and.returnValue(null);

    expect(adminguard.canActivate()).toBeFalse();
    expect(localStorageSpy).toHaveBeenCalledWith("Admin");
    expect(localStorageSpy).toHaveBeenCalledWith("user");
    expect(toastrService.warning).not.toHaveBeenCalled();
    expect(toastrService.info).toHaveBeenCalledWith("please login to access");
    expect(router.navigate).toHaveBeenCalledWith(["/login"]);
  });
});
