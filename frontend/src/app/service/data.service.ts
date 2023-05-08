import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User, products } from "datatype";

@Injectable({
  providedIn: "root",
})
export class DataService {
  signupForm!: User;
  page: any;
  limit: any;
  sort = "alphabetical";

  constructor(private http: HttpClient) {}

  getProducts(data: string) {
    return this.http.get(`http://localhost:3000/api/products?category=${data}`);
  }
  getAllProducts(page: number, limit: number, sort: string) {
    return this.http.get(
      `http://localhost:3000/api/products?page=${page}&limit=${limit}&sort=${sort}`
    );
  }
  signupUsers(data: User) {
    return this.http.post("http://localhost:3000/api/users", data);
  }
  getSignupusers(data: User) {
    return this.http.post("http://localhost:3000/api/users/login", data);
  }
  addToCart(data: products) {
    return this.http.post("http://localhost:3000/api/cart", data);
  }
  getCart(id: number) {
    return this.http.get(`http://localhost:3000/api/cart?user=${id}`);
  }
}
