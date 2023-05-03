const { json } = require("express");
const db = require("../model");
const { saveData,findData ,deleteData,editData} = require("./db.service");
const Usercart = db.usercart;

class UserCartService {
  createUserCart(carts) {
    const usercart = new Usercart(carts);
    return saveData(usercart);
  }
  getUserCart(id){
    return findData(Usercart,id);
  }
  removeCart(id) {
    return deleteData(Usercart, id);
  }
  edidCart(id,data){
    return editData(Usercart,id,data)
  }
}
const usercartService = new UserCartService();
module.exports = usercartService;
