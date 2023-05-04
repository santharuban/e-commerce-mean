import { HttpClient } from "@angular/common/http";
import { isNgTemplate } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { products } from "datatype";
import { BehaviorSubject } from "rxjs";
import jwtDecode from "jwt-decode";
@Injectable({
  providedIn: "root",
})


export class CartService {
  public cartList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  userCart="http://localhost:3000/api/usercart/userproduct";
  constructor(private http:HttpClient) {}
  
  public userData:any
  getproducts() {
    return this.productList.asObservable();
  }
  addCart(item: products) {
   const user=localStorage.getItem("user")
    if(user!=null){
     this.userData=jwtDecode(user)
      item.user=this.userData.userId
      this.http.post(`${this.userCart}`,item).subscribe();
    }
    this.cartList.push(item);
    this.productList.next(this.cartList);
    this.getTotalPrice();
    this.postCartDb();

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

  postCartDb(){
    const cartData={UserCart:this.cartList};
    console.log(this.cartList);
  
  }
}
