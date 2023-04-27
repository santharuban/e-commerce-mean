import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { products } from "datatype";
import { map, pipe } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any>("http://localhost:3000/api/products");
  }
  postProducts(product: products) {
    return this.http.post("http://localhost:3000/api/products", product);
  }
  updateProducts(product: products, _id: number) {
    return this.http.put(`http://localhost:3000/api/products/${_id}`, product);
  }
  getProductById(id: number) {
    return this.http.get(`http://localhost:3000/api/products/${id}`);
  }
  deleteProducts(id: number) {
    return this.http.delete(`http://localhost:3000/api/products/${id}`);
  }
}
