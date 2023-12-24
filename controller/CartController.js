//Purpose: Cart controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const CartSchema = require("../model/CartSchema");
//-----------------------------------------------------------------//

//------------------Cart Create----------------//
const create = (req, resp) => {
  const CartSchema = new WishlistSchema({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  CartSchema
    .save()
    .then((data) => {
      resp.status(200).json({ message: "Cart created successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while creating the Cartlist",
      });
    });
};
//------------------------------------------------//

//------------------Card Find By Id-----------//
const findById = (req, resp) => {
  CartSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found cart with id " + req.params.id,
        });
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Error retrieving Card with id " + req.params.id,
      });
    });
};
//------------------------------------------------//

//------------------Cart Update---------------//
const update = async (req, resp) => {
  const updateData = await CartSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
      },
    },
    { new: true }
  )
    .then((data) => {
      resp.status(200).json({ message: "Card updated successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while updating the Cartlist",
      });
    });
};
//------------------------------------------------//

//------------------Cart Delete---------------//
const deleteById = (req, resp) => {
  CartSchema.findByIdAndRemove({ _id: req.params.id })
    .then((data) => {
      resp.status(200).json({ message: "Cart deleted successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while deleting the Cartlist",
      });
    });
};
//------------------------------------------------//

//------------------Wishlist Find All--------------//
const findAll = (req, resp) => {
  CartSchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while retrieving the Cartlist",
      });
    });
};
//------------------------------------------------//

//-------------------Cart Count-------------------//
const count = (req, resp) => {
  CartSchema.countDocuments()
    .then((data) => {
      resp.send(data.toString());
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while counting the Cartlist",
      });
    });
};

//------------------Exporting Functions----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count,
};
//------------------------------------------------//