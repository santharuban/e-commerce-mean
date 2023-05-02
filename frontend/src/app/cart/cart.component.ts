import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../service/cart.service";
import { ToastrService } from "ngx-toastr";
import { products } from "datatype";
import { MatDialog } from "@angular/material/dialog";
import { OrderComponent } from "../order/order.component";
import { DataService } from "../service/data.service";
import { HttpClient } from "@angular/common/http";
import jwtDecode from "jwt-decode";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  public cartData!: any;
  public productitem: any;
  public user = localStorage.getItem("user");
  public grandtotal!: number;
  public email:any
  public decode:any
  id!: number;
  userCart = "http://localhost:3000/api/usercart/userproduct";
  constructor(
    private cart: CartService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog,
    public data: DataService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    if(this.user!=null){
      this.decode=jwtDecode(this.user)
      this.email=this.decode.email
     }
    this.getCart()

  }

  getCart() {
    this.http
      .get(`${this.userCart}/${this.email}`)
      .subscribe((res) => {
        this.cartData = res;
        this.grandtotal = this.cart.getTotalPrice();
      });
  }
  remove(item: any) {
    console.log(item);
    this.http.delete(`${this.userCart}/${item}`).subscribe(() => {
      this.toastrService.warning("Item deleted");
      this.getCart();
    });
  }

  increase(data: any) {
    if (data.quantity >= 10) {
      this.toastrService.info("You can add upto 10 units only !");
      data.quantity = 10;
    } else if (data.quantity >= 1) {
      data.quantity++;
      data.total = data.price * data.quantity;
      this.http.put(`${this.userCart}/${data._id}`, data).subscribe(
        () => {
          this.getCart();
        },
        (err: any) => {
          this.toastrService.error(`${err.status} Error ${err.message}`);
        }
      );
    }
  }
  decrease(data: any) {
    if (data.quantity > 1) {
      data.quantity--;
      data.total = data.price * data.quantity;
      this.http.put(`${this.userCart}/${data._id}`, data).subscribe(
        () => {
          this.getCart();
        },
        (err: any) => {
          this.toastrService.error(`${err.status} Error ${err.message}`);
        }
      );
    } else if (data.quantity == 1) {
      this.remove(data._id);
    }
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
}
