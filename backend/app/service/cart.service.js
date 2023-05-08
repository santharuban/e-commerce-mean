const { json } = require("express");
const db = require("../model");
const { saveData, findDataById } = require("./db.service");
const Cart = db.cart;

class CartService {
  createCart(postCart) {
    const cart = new Cart(postCart);
    return saveData(cart);
  }
  retrieveCart(id) {
    return findDataById(Cart, id);
  }
  postCart() {
    const cart = new Cart(data);
    return saveData(cart);
  }
}

const cartService = new CartService();
module.exports = cartService;
