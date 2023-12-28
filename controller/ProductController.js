//Purpose: Product controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const ProductSchema = require("../model/ProductSchema");
const ResponseService = require("../services/ResponseService");
//-----------------------------------------------------------------//

//------------------Product Create----------------//
const create = (req, resp) => {
  const product = new ProductSchema({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    qtyOnHand: req.body.qtyOnHand,
  });

  product
    .save()
    .then(() => {
      return ResponseService(resp, 200, "Product created successfully");
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Product Find By Id------------//
const findById = (req, resp) => {
  ProductSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Product not found with id " + req.params.id
        );
      } else {
        resp.json(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------Product Update----------------//
const update = async (req, resp) => {
  const updateData = await ProductSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        qtyOnHand: req.body.qtyOnHand,
      },
    },
    { new: true }
  );
  if (updateData) {
    return ResponseService(resp, 200, "Product updated successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Error updating Product with id " + req.params.id
    );
  }
};
//------------------------------------------------//

//------------------Product Delete----------------//
const deleteById = async (req, resp) => {
  const deleteData = await ProductSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    return ResponseService(resp, 200, "Product deleted successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Could not delete Product with id " + req.params.id
    );
  }
};
//------------------------------------------------//

//------------------Product Find All--------------//
const findAll = async (req, resp) => {
  try {
    const { searchText, page = 1, size = 10 } = req.params;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};

    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageNumber - 1) * pageSize;

    const data = await ProductSchema.find(query)
      .limit(pageSize)
      .skip(skip)
      .exec();
    resp.status(200).json(data);
  } catch (err) {
    return ResponseService(resp, 500, err.message);
  }
};
//------------------------------------------------//

//------------------Product Count----------------//
const count = async (req, resp) => {
  try {
    const data = await ProductSchema.countDocuments(query);
    resp.status(200).json(data);
  } catch (err) {
    return ResponseService(resp, 500, err.message);
  }
};

//------------------Export module----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
  count,
};
//------------------------------------------------//
