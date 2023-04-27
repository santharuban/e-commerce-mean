import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { products } from "datatype";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { HeaderComponent } from "../header/header.component";
import { CartService } from "../service/cart.service";
import { CartComponent } from "./cart.component";

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let item: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, HeaderComponent],
      imports: [MatDialogModule],
      providers: [{ provide: ToastrService, useValue: ToastrService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("remove", () => {
    let component: CartComponent;
    let cartService: CartService;
    let item: any;

    beforeEach(() => {
      cartService = jasmine.createSpyObj("CartService", ["removeitem"]);
      item = { id: 1, name: "Product 1", price: 10.99 };
    });

    it("should call the CartService removeitem method with the item to be removed", () => {
      component.remove(item);

      expect(cartService.removeitem).toHaveBeenCalledWith(item);
    });
  });
  it("should be increase", () => {
    component.increase(item);
  });
  it("should be decrease", () => {
    component.decrease(item);
  });
  it("", () => {
    component.decrease;
  });
  it("should be placeorder", () => {
    component.placeOrder();
  });
  describe("CartComponent", () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let cartService: CartService;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [CartComponent],
        providers: [CartService, ToastrService],
        imports: [MatDialogModule],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(CartComponent);
      component = fixture.componentInstance;
      cartService = TestBed.inject(CartService);

      spyOn(component.dialog, "open").and.callThrough();
      spyOn(component.dialog, "closeAll").and.callThrough();

      fixture.detectChanges();
    });

    it("should decrease the quantity and call ngOnInit when quantity is greater than 1", () => {
      const item = { name: "Product A", price: 10, quantity: 2 };
      spyOn(component, "ngOnInit");

      component.decrease(item);

      expect(item.quantity).toEqual(1);
      expect(component.ngOnInit).toHaveBeenCalled();
    });

    it("should not decrease the quantity and not call ngOnInit when quantity is 1", () => {
      const item = { name: "Product A", price: 10, quantity: 1 };
      spyOn(component, "ngOnInit");
      component.decrease(item);
      expect(item.quantity).toEqual(1);
      expect(component.ngOnInit).not.toHaveBeenCalled();
    });
  });
});
