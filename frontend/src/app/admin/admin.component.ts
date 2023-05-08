import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from "../service/admin.service";
import { ToastrService } from "ngx-toastr";
import { User } from "datatype";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent {
  ngForm!: User;
  title!: User;
  static factor: User;
  constructor(
    private admin: AdminService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  onSubmit(addproduct: NgForm) {
    this.admin.postProducts(addproduct.value).subscribe(
      (res) => {
        this.toastrService.success("product added successfully");
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
    addproduct.resetForm();
    this.router.navigate(["/view-edit"]);
  }
}
