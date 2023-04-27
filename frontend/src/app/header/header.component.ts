import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CartService } from "../service/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  hide = false;
  public totalitem: number = 0;
  public searchText: string = "";
  constructor(
    private cart: CartService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.cart.getproducts().subscribe(
      (res) => {
        this.totalitem = res.length;
      },
      (error) => {
        this.toastrService.error(`${error.name} error ${error.status}`);
      }
    );
    const user = localStorage.getItem("user");
    const value = localStorage.getItem("Admin");
    if (user != null) {
      this.hide = true;
    } else if (value != null) {
      this.hide = true;
    } else {
      this.hide = false;
    }
  }
  Logout() {
    this.cart.removeAll();
    localStorage.clear();
    this.toastrService.info("you are logged out");
    this.router.navigate(["/login"]);
    HeaderComponent;
  }
}
