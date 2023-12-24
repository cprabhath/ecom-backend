////Purpose: Wishlist controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const WishlistSchema = require("../model/WishlistSchema");
const ResponseService = require("../services/ResponseService");
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
      if (data) {
        return ResponseService(resp, 200, "Wishlist created successfully");
      } else {
        return ResponseService(resp, 500, err.message);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Wishlist Find By Id-----------//
const findById = (req, resp) => {
  WishlistSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(resp, 404, "Wishlist not found with id " + req.params.id);
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
  );
  if (!updateData) {
    return ResponseService(resp, 404, "Wishlist not found with id " + req.params.id);
  } else {
    return ResponseService(resp, 200, "Wishlist updated successfully");
  }
};
//------------------------------------------------//

//------------------Wishlist Delete---------------//
const deleteById = (req, resp) => {
  WishlistSchema.findByIdAndRemove({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return ResponseService(resp, 404, "Wishlist not found with id " + req.params.id);
      } else {
        return ResponseService(resp, 200, "Wishlist deleted successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//-------------------Wishlist Count----------------//
const count = (req, resp) => {
  WishlistSchema.countDocuments()
    .then((data) => {
      resp.send(data.toString());
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//


//------------------Exporting Functions------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count,
};
//------------------------------------------------//