import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToastrModule } from "ngx-toastr";

import { SignupComponent } from "./signup.component";
import { throwError } from "rxjs";

describe("SignupComponent", () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid form when all fields are filled in correctly", () => {
    const { firstname, lastname, email, mobilenumber, password } =
      component.signupForm.controls;
    firstname.setValue("dili");
    lastname.setValue("k");
    email.setValue("dili@gmail.com");
    mobilenumber.setValue("9736574315");
    password.setValue("Abc123!@#");
    expect(component.signupForm.valid).toBeTruthy();
  });

  it("should have an invalid form when fields are empty", () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it("should show a success message when the user is signed up successfully", () => {
    spyOn(component.toastrService, "success");
    const { firstname, lastname, email, mobilenumber, password } =
      component.signupForm.controls;
    firstname.setValue("rolex");
    lastname.setValue("v");
    email.setValue("rolex@gmail.com");
    mobilenumber.setValue("9867476675");
    password.setValue("Abc123!@#");
    component.signUp(component.signupForm.value);
    expect(component.toastrService.success).toHaveBeenCalled();
  });

  it("should show an error message when there is an error signing up the user", () => {
    spyOn(component.toastrService, "error");
    spyOn(component.data, "signupUsers").and.returnValue(
      throwError({ status: 500, name: "Internal Server Error" })
    );
    const { firstname, lastname, email, mobilenumber, password } =
      component.signupForm.controls;
    firstname.setValue("abc");
    lastname.setValue("d");
    email.setValue("abc@gmail.com");
    mobilenumber.setValue("9686977465");
    password.setValue("Abc123!@#");
    component.signUp(component.signupForm.value);
    expect(component.toastrService.error).toHaveBeenCalled();
  });
});
