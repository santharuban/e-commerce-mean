const auth = require("../../middleware/authTokenVerify.js");

module.exports = (app) => {
  const cart = require("../controller/cart.controller.js");

  var router = require("express").Router();

  router.post("/", auth.authTokenVerifyUser, cart.postUserCart);
  app.use("/api/cart", router);
};
