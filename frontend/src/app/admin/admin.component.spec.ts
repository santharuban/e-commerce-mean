import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { HeaderComponent } from "../header/header.component";
import { AdminService } from "../service/admin.service";
import { AdminComponent } from "./admin.component";

describe("AdminComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent, HeaderComponent],
      imports: [FormsModule],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ToastrService, useValue: ToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
describe("MyComponent", () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const adminSpy = jasmine.createSpyObj("AdminService", ["postProducts"]);
    const toastrSpy = jasmine.createSpyObj("ToastrService", [
      "success",
      "error",
    ]);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AdminComponent],
      providers: [
        { provide: AdminService, useValue: adminSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    adminServiceSpy = TestBed.inject(
      AdminService
    ) as jasmine.SpyObj<AdminService>;
    toastrServiceSpy = TestBed.inject(
      ToastrService
    ) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should call postProducts method with form value and reset form", () => {
    const formValue = {
      productName: "Test Product",
      productPrice: 10.99,
    };
    const ngForm = {
      value: formValue,
      resetForm: jasmine.createSpy(),
    } as unknown as NgForm;
    adminServiceSpy.postProducts.and.returnValue(of({}));

    component.onSubmit(ngForm);

    expect(adminServiceSpy.postProducts).toHaveBeenCalledWith(formValue);
    expect(ngForm.resetForm).toHaveBeenCalled();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(
      "product added successfully"
    );
  });

  it("should display an error message if the postProducts method fails", () => {
    const formValue = {
      productName: "Test Product",
      productPrice: 10.99,
    };
    const ngForm = {
      value: formValue,
      resetForm: jasmine.createSpy(),
    } as unknown as NgForm;
    const error = { name: "Server Error", status: 500 };
    adminServiceSpy.postProducts.and.returnValue(throwError(error));
    component.onSubmit(ngForm);
    expect(adminServiceSpy.postProducts).toHaveBeenCalledWith(formValue);
    expect(ngForm.resetForm).toHaveBeenCalled();
    expect(toastrServiceSpy.error).toHaveBeenCalledWith(
      `${error.name} error ${error.status}`
    );
  });
});
