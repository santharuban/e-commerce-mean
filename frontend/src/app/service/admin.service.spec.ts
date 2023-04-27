import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { AdminService } from "./admin.service";

describe("AdminService", () => {
  let service: AdminService;
  let product: any;
  let id: number;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(AdminService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("", () => {
    service.postProducts(product);
  });
  it("", () => {
    service.deleteProducts(id);
  });
});
