import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "datatype";
import { ToastrService } from "ngx-toastr";
import { DataService } from "../service/data.service";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public toastrService: ToastrService,
    public data: DataService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.pattern("^[A-Za-z]*$")]],
      lastname: ["", [Validators.required, Validators.pattern("^[A-Za-z]*$")]],
      email: ["", [Validators.required, Validators.email]],
      mobilenumber: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(10),
        ],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          ),
          Validators.minLength(8),
        ],
      ],
    });
  }
  signUp(data: User) {
    if (this.signupForm.valid) {
      this.data.signupUsers(data).subscribe(
        () => {
          this.signupForm.reset();
          this.router.navigate(["login"]);
          this.toastrService.success("you are successfully signed up");
        },
        (error) => {
          this.toastrService.error(`${error.name} error ${error.status}`);
        }
      );
    } else {
      this.toastrService.warning("please enter valid data");
    }
  }
}
