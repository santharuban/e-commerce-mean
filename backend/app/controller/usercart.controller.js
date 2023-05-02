const usercartService = require("../service/usercart.service");

exports.postCart=async (req,res) =>{
  // console.log("hhhhhhhhhhhhhh",req.body)
    const carts = {
      title: req.body.title,
      price: req.body.price,
      quantity: req.body.quantity,
      image: req.body.image,
      email: req.body.user,
      total:req.body.total,
    };
    try {
      const dataPost = await usercartService.createUserCart(carts);
      res.json(dataPost);
      // console.log(dataPost);
    } catch (err) {
      res
        .status(500)
        .send(err.message || "error occurs while pushing the cart products");
    }
  };

  exports.getUserCart=async(req,res) =>{
    // console.log(req.body)
    try{
      const data=req.params;
      // console.log(data);
      const product=await usercartService.getUserCart(data);
      res.json(product);
      // console.log("response",product)
    }
    catch(err){
      res.status(500).send(err);
    }
  }
  exports.removeCart = async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id)
      const data = await usercartService.removeCart(id);
      res.json(data);
    } catch (err) {
      res
        .status(500)
        .send(err.message || "error occurs while deleting the product");
    }
  };
  exports.updateDelivery = async (req, res) => { 
  try{
    const id = req.body._id;
    console.log(id);
    const data=await usercartService.edidCart(id,req.body)
    res.json(data);
  }catch {
        res.status(500).send({
          message: "Error updating Product with id=" + id,
        });
      }
  };