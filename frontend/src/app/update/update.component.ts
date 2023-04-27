import { Component, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { products } from "datatype";
import { AdminService } from "../service/admin.service";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"],
})
export class UpdateComponent implements OnInit {
  public items!: products[];
  public id: any;
  public addproduct!: products;
  public product!: products;
  constructor(
    private admin: AdminService,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.id = localStorage.getItem("id");
    this.admin.getProductById(this.id).subscribe((res: any) => {
      this.product = res;
    });
  }
  onSubmit(addproduct: NgForm) {
    this.admin.updateProducts(addproduct.value, addproduct.value.id).subscribe(
      (res) => {
        this.toastrService.success("product was edited");
        this.dialog.closeAll();
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
  }
}
