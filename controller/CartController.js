//Purpose: Cart controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const WishlistSchema = require("../model/WishlistSchema");
//-----------------------------------------------------------------//

//------------------Wishlist Create----------------//
const create = (req, resp) => {
  const wishlist = new WishlistSchema({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  wishlist
    .save()
    .then((data) => {
      resp.status(200).json({ message: "Wishlist created successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while creating the Wishlist",
      });
    });
};
//------------------------------------------------//

//------------------Wishlist Find By Id-----------//
const findById = (req, resp) => {
  WishlistSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found Wishlist with id " + req.params.id,
        });
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Error retrieving Wishlist with id " + req.params.id,
      });
    });
};
//------------------------------------------------//

//------------------Wishlist Update---------------//
const update = async (req, resp) => {
  const updateData = await WishlistSchema.findOneAndUpdate(
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
      resp.status(200).json({ message: "Wishlist updated successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while updating the Wishlist",
      });
    });
};
//------------------------------------------------//

//------------------Wishlist Delete---------------//
const deleteById = (req, resp) => {
  WishlistSchema.findByIdAndRemove({ _id: req.params.id })
    .then((data) => {
      resp.status(200).json({ message: "Wishlist deleted successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while deleting the Wishlist",
      });
    });
};
//------------------------------------------------//

//------------------Wishlist Find All--------------//
const findAll = (req, resp) => {
  WishlistSchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while retrieving the Wishlist",
      });
    });
};
//------------------------------------------------//

//------------------Exporting Functions----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
};
//------------------------------------------------//