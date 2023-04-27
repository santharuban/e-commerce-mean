const cartService = require("../service/cart.service");

exports.postUserCart = async (req, res) => {
  const cart = {
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    user: req.body.user,
  };

  try {
    const data = await cartService.createCart(cart);
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occurs while pushing the cart products");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const id = req.params.id;
    const Cart = await cartService.retrieveCart(id);
    res.json(Cart);
  } catch (err) {
    res
      .status(400)
      .send(err.message || "error occurs while getting the cart products");
  }
};
