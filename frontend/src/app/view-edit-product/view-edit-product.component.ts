// import { Component, OnChanges, OnInit,ViewChild } from "@angular/core";
// import { Router } from "@angular/router";
// import { products } from "datatype";
// import { ToastrService } from "ngx-toastr";
// import { AdminService } from "../service/admin.service";
// import { MatDialog } from "@angular/material/dialog";
// import { UpdateComponent } from "../update/update.component";
// import { CartService } from "../service/cart.service";



// @Component({
//   selector: "app-view-edit-product",
//   templateUrl: "./view-edit-product.component.html",
//   styleUrls: ["./view-edit-product.component.css"],
// })
// export class ViewEditProductComponent implements OnInit {
//   public items!: products[];
//   page:number=11;
//   constructor(
//     private admin: AdminService,
//     private router: Router,
//     private toastrService: ToastrService,
//     public dialog: MatDialog,
//     private cart: CartService,
//   ) {}
//   ngOnInit(): void {
//     this.getProducts();
//   }
//   getProducts() {
//     this.admin.getProducts().subscribe((res) => {
//       this.items = res.data;
//       console.log(res.data)
//     });
    
//   }
//   onSubmit(deleteproduct: number) {
//     this.admin.deleteProducts(deleteproduct).subscribe(
//       (res) => {
//         this.toastrService.info("product is deleted");
//         this.getProducts();
//       },
//       (error) => {
//         this.toastrService.error(`${error.name} error ${error.status}`);
//       }
//     );
//     this.getProducts();
//   }
//   updateSubmit(data: any) {
//     localStorage.setItem("id", data);
//     this.dialog
//       .open(UpdateComponent)
//       .afterClosed()
//       .subscribe(() => {
//         this.getProducts();
//       });
//   }
// }

import { Component, OnInit } from "@angular/core";
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
  public page: number=1;
  limit: number = 5;
  sort: string = "";
  totalPages: number = 0;
  prevPage: number | null = null;
  nextPage: number | null = null;

  constructor(
    private admin: AdminService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    // this.getProducts();
  }

  getProducts() {
    this.admin
      .getProducts(this.page,this.limit)
      .subscribe((res) => {
        this.items = res.data;
        this.totalPages = res.totalPages;
        this.prevPage = res.prevPage;
        this.nextPage = res.nextPage;
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

  goToPrevPage() {
    if (this.prevPage !== null) {
      this.page = this.prevPage;
      this.getProducts();
    }
  }

  goToNextPage() {
    if (this.nextPage !== null) {
      this.page = this.nextPage;
      this.getProducts();
    }
  }
  paget(){
    console.log("jhgfx")
   this.page++
   this.getProducts();
  }
}

