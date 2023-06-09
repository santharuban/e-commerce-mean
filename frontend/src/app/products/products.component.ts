import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuard } from "../authguard/auth.guard";
import { CartService } from "../service/cart.service";
import { DataService } from "../service/data.service";
import { ToastrService } from "ngx-toastr";
import { ThisReceiver } from "@angular/compiler";
import { products } from "datatype";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  item!: products;
  searchKey: string = "";
  public filterCategory: any;
  public page: number = 1;
  limit: number = 5;
  prevPage!: number
  nextPage: number | null = null;
  sort: string = "asc";
  currentPage: any;
  constructor(
    private data: DataService,
    private cart: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.getProduct();
  }
  addCart(item: products) {
    this.cart.addCart(item);
  }
  getProduct() {
    this.data.getAllProducts(this.page, this.limit, this.sort).subscribe(
      (res: any) => {
        this.productList = res.data;

        this.productList.forEach((item: products) => {
          Object.assign(item, { quantity: 1, total: item.price });
        });
        this.cart.search.subscribe((value: any) => {
          this.searchKey = value;
        });
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
  }
  filter(category: string) {
    this.data.getProducts(category).subscribe(
      (res) => {
        this.productList = res;
        this.filterCategory = res;

        this.productList.forEach((item: products) => {
          Object.assign(item, { quantity: 1, total: item.price });
        });
        this.cart.search.subscribe((value: any) => {
          this.searchKey = value;
        });
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
  }
  goToPrevPage() {
      if(this.prevPage!==null){
      this.page = this.prevPage;
      this.getProduct();
      }
    
  }
  paget() {
    this.page++;
    this.getProduct();
  }
}
