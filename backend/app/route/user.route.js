module.exports = (app) => {
  const users = require("../controller/user.controller.js");
  var router = require("express").Router();

  router.get("/:id", users.getUsersById);
  router.post("/login", users.signInUsers);
  router.post("/", users.createUser);
  app.use("/api/users", router);
};
