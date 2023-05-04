const productService = require("../service/product.service");

exports.createProducts = async (req, res) => {
  const products = {
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
    category: req.body.category,
  };
  try {
    const product = await productService.createProducts(products);
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occurs while adding the product");
  }
};

exports.getProducts = async (req, res,next) => {
  try {
    let {page,size}=req.query;
    if(!page){
       page=1;
    }
    if(!size){
       size=5;
    }
    const limit=parseInt(size);
    const skip =(page -1)*size;

    const Products = await productService.getProducts().limit(limit).skip(skip);
    const data=req.body;
    // const Products = await productService.getProducts(data);
    res.json(Products);
    res.json({page,size,data:users})
  } catch (err) {
    res.status(500).send(err || "error occurs while getting the product");
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productService.getProductsById(id);
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .send(err.meassage || "error occurs while getting an product with an id");
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productService.updateProducts(id, req.body);
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occurs while updating the product");
  }
};

exports.removeProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productService.removeProducts(id);

    res.json(data);
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occurs while deleting the product");
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    if (category == null) {
      const products = await productService.getProducts({});
      res.json(products);
    } else {
      const products = await productService.getProductsByCategory({ category });
      res.json(products);
    }
  } catch (err) {
    res
      .status(500)
      .send(err.message || "error occurs while getting the category");
  }
};
