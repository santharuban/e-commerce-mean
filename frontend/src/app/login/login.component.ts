import { HttpClient } from "@angular/common/http";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DataService } from "../service/data.service";
import { User } from "datatype";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public Form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    public toastrService: ToastrService,
    public data: DataService
  ) {}
  ngOnInit(): void {
    this.Form = this.formBuilder.group({
      email: ["", Validators.required, Validators.email],
      password: [
        "",
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        ),
      ],
    });
  }

  onSubmit() {
    this.data.getSignupusers(this.Form.value).subscribe(
      (res: any) => {
        if (res.role === "Admin") {
          localStorage.setItem("Admin", res.accessToken);
          this.toastrService.success("welcome admin");
          this.router.navigate(["/admin"]);
        } else {
          this.toastrService.success("you re successfully logged in");
          localStorage.setItem("user", res.accessToken);
          this.Form.reset();
          this.router.navigate(["home"]);
        }
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
  }
}
