import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { products } from "datatype";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  page: any;
  limit: any;
  sort = "asc";
  constructor(private http: HttpClient) {}

  getProducts(page: number, limit: number, sort: string) {
    return this.http.get<any>(
      `http://localhost:3000/api/products/admin?page=${page}&limit=${limit}&sort=${sort}`
    );
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
