// Purpose: Order controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const OrderSchema = require("../model/OrdersSchema");
const ResponseService = require("../services/ResponseService");
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
      if (data) {
        return ResponseService(resp, 200, "Order created successfully");
      } else {
        return ResponseService(resp, 500, err.message);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//---------------------------------------------//

//------------------Order Find By Id-----------//
const findById = (req, resp) => {
  OrderSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "Order not found with id " + req.params.id
        );
      } else {
        resp.json(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
    return ResponseService(resp, 200, "Order updated successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Error updating Order with id " + req.params.id
    );
  }
};
//---------------------------------------------//

//------------------Order Delete---------------//
const deleteById = async (req, resp) => {
  const deleteData = await OrderSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    return ResponseService(resp, 200, "Order deleted successfully");
  } else {
    return ResponseService(
      resp,
      500,
      "Error deleting Order with id " + req.params.id
    );
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
    return ResponseService(resp, 500, err.message);
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
