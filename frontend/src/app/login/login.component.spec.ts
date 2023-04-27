import { LoginComponent } from "./login.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { DataService } from "../service/data.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastrService: ToastrService;
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      declarations: [LoginComponent],
      providers: [ToastrService, DataService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it("should create the login component", () => {
    expect(component).toBeTruthy();
  });

  it("should have a login form with Username and password fields", () => {
    const form = component.Form;
    expect(form.contains("Username")).toBeTruthy();
    expect(form.contains("password")).toBeTruthy();
  });

  it("should validate the email format in the Username field", () => {
    const username = component.Form.controls["Username"];
    expect(username.valid).toBeFalsy();

    username.setValue("test@example.com");
    expect(username.valid).toBeTruthy();

    username.setValue("invalid-email");
    expect(username.valid).toBeFalsy();
  });

  it("should validate the password format in the password field", () => {
    const password = component.Form.controls["password"];
    expect(password.valid).toBeFalsy();

    password.setValue("Abc123!@#");
    expect(password.valid).toBeTruthy();

    password.setValue("invalidpassword");
    expect(password.valid).toBeFalsy();
  });

  it("should show an error message when trying to submit an invalid form", () => {
    spyOn(toastrService, "error");
    component.onSubmit();
    expect(toastrService.error).toHaveBeenCalled();
  });

  it("should show a success message and navigate to the admin page when logging in as an admin user", () => {
    spyOn(toastrService, "success");
    spyOn(component.router, "navigate");
    component.Form.controls["Username"].setValue("adminproduct@gmail.com");
    component.Form.controls["password"].setValue("Admin@grocery123#");
    component.onSubmit();
    expect(toastrService.success).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(["/admin"]);
  });

  it("should show a success message and navigate to the home page when logging in as a regular user", () => {
    spyOn(toastrService, "success");
    spyOn(component.router, "navigate");
    spyOn(dataService, "getSignupusers").and.returnValue(
      of([{ email: "test@example.com", password: "Abc123!@#" }])
    );
    component.Form.controls["Username"].setValue("test@example.com");
    component.Form.controls["password"].setValue("Abc123!@#");
    component.onSubmit();
    expect(toastrService.success).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(["/home"]);
  });
});
