const auth = require("../../middleware/authTokenVerify.js");

module.exports = (app) => {
  const products = require("../controller/product.controller.js");

  var router = require("express").Router();

  router.get("/admin", auth.authTokenVerify, products.getProducts);
  router.get("/", auth.authTokenVerifyUser, products.getProductsByCategory);
  router.get("/:id", auth.authTokenVerify, products.getProductsById);
  router.post("/", auth.authTokenVerify, products.createProducts);
  router.put("/:id", auth.authTokenVerify, products.updateProducts);
  router.delete("/:id", auth.authTokenVerify, products.removeProducts);
  app.use("/api/products", router);
};
