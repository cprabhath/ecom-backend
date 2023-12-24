// Purpose: Order controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const OrderSchema = require("../model/OrdersSchema");
//-----------------------------------------------------------------//

//------------------Order create----------------//
const create = (req, resp) => {
  const order = new OrderSchema({
    date: req.body.date,
    customer: req.body.customer,
    totalCost: req.body.totalCost,
    product: req.body.product,
  });

  order
    .save()
    .then((data) => {
      resp.status(200).json({ message: "Order created successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message: err.message || "Some error occurred while creating the Order",
      });
    });
};
//---------------------------------------------//

//------------------Order Find By Id-----------//
const findById = (req, resp) => {
  OrderSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found Order with id " + req.params.id,
        });
      } else {
        resp.json(selectedObj);
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Error retrieving Order with id " + req.params.id,
      });
    });
};
//---------------------------------------------//

//------------------Order Update---------------//
const update = async (req, resp) => {
  const updateData = await OrderSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        date: req.body.date,
        customer: req.body.customer,
        totalCost: req.body.totalCost,
        product: req.body.product,
      },
    },
    { new: true }
  );
  if (updateData) {
    resp.status(200).json({ message: "Order updated successfully" });
  } else {
    resp.status(500).json({
      message: "Error updating Order with id " + req.params.id,
    });
  }
};
//---------------------------------------------//

//------------------Order Delete---------------//
const deleteById = async (req, resp) => {
  const deleteData = await OrderSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    resp.status(200).json({ message: "Order deleted successfully" });
  } else {
    resp.status(500).json({
      message: "Error deleting Order with id " + req.params.id,
    });
  }
};
//---------------------------------------------//

//------------------Order Find All---------------//
const findAll = (req, resp) => {
  try {
    const { searchText, page = 1, size = 10 } = req.params;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};

    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageNumber - 1) * pageSize;

    const data = OrderSchema.find(query).limit(pageSize).skip(skip);
    resp.status(200).json(data);
  } catch (err) {
    resp.status(500).json({
      message: err.message || "Some error occurred while retrieving order.",
    });
  }
};
//---------------------------------------------//

//------------------Export module---------------//
module.exports = {
  create,
  findById,
  update,
  deleteById,
  findAll,
};
//---------------------------------------------//
