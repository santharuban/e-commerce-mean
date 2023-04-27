import { CartService } from "./cart.service";
import { products } from "datatype";

describe("CartService", () => {
  let service: CartService;
  let product: any;

  beforeEach(() => {
    service = new CartService();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("addCart", () => {
    it("should add an item to the cartList array and update the productList", () => {
      const item: products = {
        _id: 1,
        price: 10,
        title: "",
        quantity: "",
        image: "",
        total: "",
        category: undefined,
      };
      service.addCart(item);
      expect(service.cartList).toEqual([item]);
      expect(service.productList.getValue()).toEqual([item]);
    });
  });

  describe("getTotalPrice", () => {
    it("should return the total price of all items in the cartList array", () => {
      service.cartList = [
        { id: 1, name: "Product 1", price: 10, quantity: 2, total: 20 },
        { id: 2, name: "Product 2", price: 20, quantity: 1, total: 20 },
      ];
      expect(service.getTotalPrice()).toEqual(40);
    });
  });

  describe("removeitem", () => {
    it("should remove an item from the cartList array and update the productList", () => {
      const item1: products = {
        _id: 1,
        price: 10,
        title: "",
        quantity: "",
        image: "",
        total: "",
        category: undefined,
      };
      const item2: products = {
        _id: 1,
        price: 10,
        title: "",
        quantity: "",
        image: "",
        total: "",
        category: undefined,
      };
      service.cartList = [item1, item2];
      service.removeitem(item1);
      expect(service.cartList).toEqual([item2]);
      expect(service.productList.getValue()).toEqual([item2]);
    });
  });

  describe("removeAll", () => {
    it("should remove all items from the cartList array and update the productList", () => {
      service.cartList = [
        { id: 1, name: "Product 1", price: 10, quantity: 2, total: 20 },
        { id: 2, name: "Product 2", price: 20, quantity: 1, total: 20 },
      ];
      service.removeAll();
      expect(service.cartList).toEqual([]);
      expect(service.productList.getValue()).toEqual([]);
    });
  });
});
