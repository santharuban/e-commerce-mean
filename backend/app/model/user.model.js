module.exports = (mongoose) => {
  const Users = mongoose.model(
    "Users",
    mongoose.Schema(
      {
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: String,
        firstname: String,
        lastname: String,
        mobilenumber: Number,
      },
      { timestamps: true }
    )
  );

  return Users;
};
