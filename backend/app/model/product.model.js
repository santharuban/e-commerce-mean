module.exports = (mongoose) => {
  const Products = mongoose.model(
    "products",
    mongoose.Schema(
      {
        title: String,
        price: Number,
        quantity: String,
        image: String,
        category: String,
      },
      { timestamps: true }
    )
  );

  return Products;
};
