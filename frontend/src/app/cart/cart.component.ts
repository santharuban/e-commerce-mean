import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../service/cart.service";
import { ToastrService } from "ngx-toastr";
import { products } from "datatype";
import { MatDialog } from "@angular/material/dialog";
import { OrderComponent } from "../order/order.component";
import { DataService } from "../service/data.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  public items: any = [];
  public productitem: any;
  user = localStorage.getItem("user");
  public grandtotal!: number;
  id!: number;
  constructor(
    private cart: CartService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    public data: DataService
  ) {}
  ngOnInit(): void {
    this.cart.getproducts().subscribe(
      (res) => {
        this.items = res;
        this.grandtotal = this.cart.getTotalPrice();
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
    this.productItem();
    this.getCart(this.id);
  }
  remove(item: products) {
    this.cart.removeitem(item);
  }
  public productItem() {
    this.productitem = new Set(this.items);
  }
  increase(item: { quantity: number }) {
    item.quantity = item.quantity + 1;
    this.ngOnInit();
  }
  decrease(item: { quantity: number }) {
    if (item.quantity != 1) item.quantity = item.quantity - 1;
    this.ngOnInit();
  }
  async placeOrder() {
    for (const element of this.productitem) {
      element.user = this.user;
      await this.data.addToCart(element).subscribe();
    }
    this.dialog.open(OrderComponent);
    setTimeout(() => {
      this.dialog.closeAll();
      this.cart.removeAll();
    }, 3000);
  }
  getCart(id: number) {
    this.data.getCart(id).subscribe((res) => {
      this.items = res;
    });
  }
}
