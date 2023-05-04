const usercartService = require("../service/usercart.service");

exports.postCart = async (req, res) => {
  const carts = {
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    email: req.body.user,
    total: req.body.total,
  };
  try {
    const dataPost = await usercartService.createUserCart(carts);
    res.json(dataPost);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "email already exists" });
    } else {
      res
        .status(500)
        .send(err.message || "error occurs while pushing the cart products");
    }
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userId = req.query;
    const product = await usercartService.getUserCart(userId);
    res.json(product);
  } catch (err) {
    res.status(500).send(err.message || "error occurs in getting the cart");
  }
};
exports.removeCart = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await usercartService.removeCart(id);
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occurs while deleting the product");
  }
};
exports.updateDelivery = async (req, res) => {
  try {
    const id = req.body._id;
    const data = await usercartService.edidCart(id, req.body);
    res.json(data);
  } catch {
    res.status(500).send({
      message: "Error updating Product with id=" + id,
    });
  }
};
