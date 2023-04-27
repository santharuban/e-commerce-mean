module.exports = mongoose => {
    const Cart = mongoose.model("cart",mongoose.Schema(
      {
        title:String,
        price:Number,
        quantity:String,
        image:String,
        user:String
      },
      { timestamps: true }
    )
    );
  
    return Cart;
  };