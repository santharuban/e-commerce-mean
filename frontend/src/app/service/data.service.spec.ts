import { HttpClient, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { User } from "datatype";

import { DataService } from "./data.service";

describe("DataService", () => {
  let service: DataService;
  let data: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(DataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("", () => {
    service.signupUsers(data);
  });
  it("", () => {
    service.getSignupusers(data);
  });
});
