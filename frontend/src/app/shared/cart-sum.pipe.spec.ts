import { CartSumPipe } from "./cart-sum.pipe";

describe("CartSumPipe", () => {
  it("create an instance", () => {
    const pipe = new CartSumPipe();
    expect(pipe).toBeTruthy();
  });
});
