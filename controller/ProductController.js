//Purpose: Product controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const ProductSchema = require("../model/ProductSchema");
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
    .then((data) => {
      resp.status(200).json({ message: "Product created successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};
//------------------------------------------------//

//------------------Product Find By Id------------//
const findById = (req, resp) => {
  ProductSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found Product with id " + req.params.id,
        });
      } else {
        resp.json(selectedObj);
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Error retrieving Product with id " + req.params.id,
      });
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
    resp.status(200).json({
      message: "Product updated successfully",
    });
  } else {
    resp.status(500).json({
      message: "Error Product Order with id " + req.params.id,
    });
  }
};
//------------------------------------------------//

//------------------Product Delete----------------//
const deleteById = async (req, resp) => {
  const deleteData = await ProductSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    resp.status(200).json({
      message: "Product deleted successfully",
    });
  } else {
    resp.status(500).json({
      message: "Error deleting Product with id " + req.params.id,
    });
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

    const data = await ProductSchema.find(query).limit(pageSize).skip(skip).exec();
    resp.status(200).json(data);
  } catch (err) {
    resp.status(500).json({
      message: err.message || "Some error occurred while retrieving products.",
    });
  }
};
//------------------------------------------------//

//------------------Export module----------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
};
//------------------------------------------------//
