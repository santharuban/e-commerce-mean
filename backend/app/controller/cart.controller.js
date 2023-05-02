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


