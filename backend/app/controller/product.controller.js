const { users } = require("../model");
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

exports.getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, sort } = req.query;

    let sortedField;
    if (sort === "asc") {
      sortedField = { title: "asc" };
    }

    const { results, totalPages } = await productService.getProducts(
      req.query,
      limit,
      page,
      sortedField
    );

    const currentPage = parseInt(page);
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    res.json({
      data: results,
      totalPages: totalPages,
      currentPage: parseInt(page),
      prevPage: prevPage,
      nextPage: nextPage,
    });
  } catch (err) {
    console.error(err.message);
    next(err || "error occurs while getting the product");
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

exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { page = 1, limit = 5, sort } = req.query;

    let sortedField;
    if (sort === "asc") {
      sortedField = { title: "asc" };
    }

    const category = req.query.category;
    if (!category) {
      const { results, totalPages } = await productService.getProducts(
        req.query,
        limit,
        page,
        sortedField
      );
      const currentPage = parseInt(page);
      const prevPage = currentPage > 1 ? currentPage - 1 : null;
      const nextPage = currentPage < totalPages ? currentPage + 1 : null;
      res.json({
        data: results,
        totalPages: totalPages,
        currentPage: currentPage,
        prevPage: prevPage,
        nextPage: nextPage,
      });
    } else {
      const products = await productService.getProductsByCategory({ category });
      res.json(products);
    }
  } catch (err) {
    console.error(err.message);
    next(err || "error occurs while getting the product by category");
  }
};
