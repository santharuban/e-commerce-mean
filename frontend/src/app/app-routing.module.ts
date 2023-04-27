import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from "./authguard/auth.guard";
import { AdminComponent } from "./admin/admin.component";
import { ViewEditProductComponent } from "./view-edit-product/view-edit-product.component";
import { AdminGuard } from "./authguard/admin.guard";
import { HeaderComponent } from "./header/header.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "header", component: HeaderComponent },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  {
    path: "view-edit",
    component: ViewEditProductComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
