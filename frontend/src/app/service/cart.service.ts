import { isNgTemplate } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { products } from "datatype";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartService {
  public cartList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  constructor() {}
  getproducts() {
    return this.productList.asObservable();
  }
  addCart(item: products) {
    this.cartList.push(item);
    this.productList.next(this.cartList);
    this.getTotalPrice();
  }
  getTotalPrice(): number {
    let grandtotal = 0;
    let quantity;
    this.cartList.map((item: any) => {
      quantity = item.quantity;
      grandtotal += item.total * quantity;
    });
    return grandtotal;
  }
  removeitem(item: products) {
    this.cartList.map((a: products, index: products) => {
      if (item._id === a._id) {
        this.cartList.splice(index, 1);
      }
    });
    this.productList.next(this.cartList);
  }
  removeAll() {
    this.cartList = [];
    this.productList.next(this.cartList);
  }
}
