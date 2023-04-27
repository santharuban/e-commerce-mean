import { Component, OnChanges, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { products } from "datatype";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../service/admin.service";
import { MatDialog } from "@angular/material/dialog";
import { UpdateComponent } from "../update/update.component";
import { CartService } from "../service/cart.service";

@Component({
  selector: "app-view-edit-product",
  templateUrl: "./view-edit-product.component.html",
  styleUrls: ["./view-edit-product.component.css"],
})
export class ViewEditProductComponent implements OnInit {
  public items!: products[];
  constructor(
    private admin: AdminService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private cart: CartService
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.admin.getProducts().subscribe((res) => {
      this.items = res;
    });
  }
  onSubmit(deleteproduct: number) {
    this.admin.deleteProducts(deleteproduct).subscribe(
      (res) => {
        this.toastrService.info("product is deleted");
        this.getProducts();
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
    this.getProducts();
  }
  updateSubmit(data: any) {
    localStorage.setItem("id", data);
    this.dialog
      .open(UpdateComponent)
      .afterClosed()
      .subscribe(() => {
        this.getProducts();
      });
  }
}
