import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CartComponent } from "./cart/cart.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminComponent } from "./admin/admin.component";
import { SignupComponent } from "./signup/signup.component";
import { ViewEditProductComponent } from "./view-edit-product/view-edit-product.component";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrderComponent } from "./order/order.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { UpdateComponent } from "./update/update.component";
import { AuthInterceptor } from "./interceptor/auth.interceptor";
import { CartSumPipe } from "./shared/cart-sum.pipe";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    AdminComponent,
    SignupComponent,
    ViewEditProductComponent,
    OrderComponent,
    UpdateComponent,
    CartSumPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatIconModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  entryComponents: [OrderComponent, MatIconModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
