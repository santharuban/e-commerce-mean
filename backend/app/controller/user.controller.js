const userService = require("../service/user.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const {generateToken}=require("../../middleware/authTokenVerify");
exports.createUser = async (req, res) => {
  const users = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mobilenumber: req.body.mobilenumber,
  };
  try {
    const user = await userService.createUser(users);
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occured while create an account");
  }
};

exports.signInUsers = async (req, res) => {
  if (
    req.body.email === "adminproduct@gmail.com" &&
    req.body.password === "Admin@grocery123#"
  ) {
    const tokenv = generateToken({ email: req.body.email, role: "Admin" });
    res.status(200).send({
      message: "Login successfull",
      role: "Admin",
      accessToken: tokenv,
    });
    console.log(tokenv);
  } else {
    const UserData = await userService.getUsersSingleData({
      email: req.body.email,
    });
    try {
      if (!UserData) {
        return res.status(400).send({ message: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        UserData.password
      );
      if (!passwordIsValid) {
        return res.status(400).send({
          message: "Invalid Password",
        });
      }
      const token = generateToken({ email: req.body.email, role: "user" });
      res.status(200).send({
        message: "Login successfull",
        role: "user",
        accessToken: token,
      });
    } catch (err) {
      res.status(500).send(err.message || "error in while loggin the user");
    }
  }
};

exports.getUsersById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await userService.getUsersById(id);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message || " error while getting id of an user");
  }
};
