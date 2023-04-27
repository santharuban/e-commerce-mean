const { json } = require("express");
const db = require("../model");
const { saveData, findData, findDataById,findSingleData } = require("./db.service");
const Users = db.users;

class UserService {
  createUser(postUsers) {
    const users = new Users(postUsers);
    return saveData(users);
  }
  getUsers() {
    return findData(Users);
  }
  getUsersById(id) {
    return findDataById(Users, id);
  }

  getUsersSingleData(data){
    return findSingleData(Users,data);
  }
}
const userService = new UserService();
module.exports = userService;
