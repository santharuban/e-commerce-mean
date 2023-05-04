const { json } = require("express");
const db = require("../model");
const {
  saveData,
  findData,
  findDataById,
  editData,
  deleteData,
} = require("./db.service");
const Products = db.products;

class ProductService {
  createProducts(postProducts) {
    const products = new Products(postProducts);
    return saveData(products);
  }
  getProducts(data) {
    console.log("aaa",data)
    return findData(Products,data);
  }
  getProductsById(id) {
    return findDataById(Products, id);
  }
  updateProducts(id, data) {
    return editData(Products, id, data);
  }
  removeProducts(id) {
    return deleteData(Products, id);
  }

  getProductsByCategory(category) {
    return findData(Products, category);
  }

  getProductsUser(data){
    return findData(Products,data);
  }
}
const productService = new ProductService();
module.exports = productService;
