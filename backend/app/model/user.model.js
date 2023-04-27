module.exports = mongoose => {
    const Users = mongoose.model("Users",mongoose.Schema(
      {
          email:String,
          password:String,
          firstname:String,
          lastname:String,
          mobilenumber:Number,
      },
      { timestamps: true }
    )
    );
  
    return Users;
  };