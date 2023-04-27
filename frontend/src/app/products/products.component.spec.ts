import { HttpClient, HttpHandler } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { products } from "datatype";
import { ToastrService } from "ngx-toastr";
import { of, throwError } from "rxjs";
import { HeaderComponent } from "../header/header.component";
import { DataService } from "../service/data.service";

import { ProductsComponent } from "./products.component";

describe("ProductsComponent", () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let item: products;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent, HeaderComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ToastrService, useValue: ToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("ProductListComponent", () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let dataService: DataService;
    let toastrService: ToastrService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ProductsComponent],
        providers: [DataService, ToastrService],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductsComponent);
      component = fixture.componentInstance;
      dataService = TestBed.inject(DataService);
      toastrService = TestBed.inject(ToastrService);
      spyOn(dataService, "getProducts").and.returnValue(
        of([
          { id: 1, name: "Product 1", price: 10 },
          { id: 2, name: "Product 2", price: 20 },
          { id: 3, name: "Product 3", price: 30 },
        ])
      );
      spyOn(toastrService, "error");
      fixture.detectChanges();
    });

    it("should get the list of products and initialize them with quantity and total", () => {
      expect(component.productList).toEqual([
        { id: 1, name: "Product 1", price: 10, quantity: 1, total: 10 },
        { id: 2, name: "Product 2", price: 20, quantity: 1, total: 20 },
        { id: 3, name: "Product 3", price: 30, quantity: 1, total: 30 },
      ]);
      expect(dataService.getProducts).toHaveBeenCalled();
      expect(toastrService.error).not.toHaveBeenCalled();
    });

    it("should show an error message if getting the products fails", () => {
      const errorMessage = "Something went wrong";
      spyOn(dataService, "getProducts").and.returnValue(
        throwError({
          name: "HttpErrorResponse",
          status: 404,
          message: errorMessage,
        })
      );

      fixture.detectChanges();

      expect(component.productList).toEqual([]);
      expect(dataService.getProducts).toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith(
        `HttpErrorResponse error 404`
      );
    });
    it("should add to cart", () => {
      component.addCart(item);
    });
  });
});
