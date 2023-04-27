import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ToastrService } from "ngx-toastr";
import { HeaderComponent } from "../header/header.component";

import { ViewEditProductComponent } from "./view-edit-product.component";

describe("ViewEditProductComponent", () => {
  let component: ViewEditProductComponent;
  let fixture: ComponentFixture<ViewEditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewEditProductComponent, HeaderComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ToastrService, useValue: ToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
