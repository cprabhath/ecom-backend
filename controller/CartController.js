//Purpose: Cart controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const CartSchema = require("../model/CartSchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------------------//

//------------------Cart Create----------------//
const create = (req, resp) => {
  const cartSchema = new CartSchema({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  cartSchema
    .save().then(() => {
      return ResponseService(resp, 200, "Cart created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Card Find By Id-----------//
const findById = (req, resp) => {
  CartSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(resp, 404, "Cart not found with id " + req.params.id);
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
      if (!data) {
        return ResponseService(resp, 404, "Cart not found with id " + req.params.id);
      } else {
        return ResponseService(resp, 200, "Cart updated successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Cart Delete---------------//
const deleteById = (req, resp) => {
  CartSchema.findByIdAndRemove({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return ResponseService(resp, 404, "Cart not found with id " + req.params.id);
      } else {
        return ResponseService(resp, 200, "Cart deleted successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
      return ResponseService(resp, 500, err.message);
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
      return ResponseService(resp, 500, err.message);
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