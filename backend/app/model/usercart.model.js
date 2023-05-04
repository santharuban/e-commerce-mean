module.exports = mongoose => {
    const Usercart = mongoose.model("usercart",mongoose.Schema(
      {
        title:String,
        price:Number,
        quantity:Number,
        image:String,
        userId:String,
        total:Number,
      },
      { timestamps: true }
    )
    );
  
    return Usercart;
  };