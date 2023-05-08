const auth = require("../../middleware/authTokenVerify.js");
module.exports = (app) => {
  const usercart = require("../controller/usercart.controller.js");

  var router = require("express").Router();

  router.post("/userproduct", auth.authTokenVerifyUser, usercart.postCart);
  router.get(
    "/userproduct/:userId",
    auth.authTokenVerifyUser,
    usercart.getUserCart
  );
  router.delete(
    "/userproduct/:id",
    auth.authTokenVerifyUser,
    usercart.removeCart
  );
  router.put(
    "/userproduct/:id",
    auth.authTokenVerifyUser,
    usercart.updateDelivery
  );
  app.use("/api/usercart", router);
};
