const express = require("express");
const cors = require("cors");
const db = require("./app/model");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("succesfully connected to the database");
  })
  .catch((err) => {
    console.log("there is a error in connection", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "welcome to grocery shopping" });
});

require("./app/route/product.route")(app);
require("./app/route/cart.route")(app);
require("./app/route/user.route")(app);
require("./app/route/usercart.route")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});
