// Purpose: Customer controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const CustomerSchema = require("../model/CustomersSchema");
//-----------------------------------------------------------------//

//------------------Customer Create----------------//
const create = (req, resp) => {
  const customer = new CustomerSchema({
    name: req.body.name,
    address: req.body.address,
    salary: req.body.salary,
  });

  customer
    .save()
    .then((data) => {
      resp.status(200).json({ message: "Customer created successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while creating the Customer",
      });
    });
};
//------------------------------------------------//

//------------------Customer Find By Id-----------//
const findById = (req, resp) => {
  CustomerSchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found Customer with id " + req.params.id,
        });
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Error retrieving Customer with id " + req.params.id,
      });
    });
};
//------------------------------------------------//

//------------------Customer Update---------------//
const update = async (req, resp) => {
  const updateData = await CustomerSchema.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary,
      },
    },
    { new: true }
  );
  if (updateData) {
    resp.status(200).json({
      message: "Customer updated successfully",
    });
  } else {
    resp.status(500).json({
      message: "Error updating Customer with id " + req.params.id,
    });
  }
};
//------------------------------------------------//

//------------------Customer Delete---------------//
const deleteById = async (req, resp) => {
  console.log(req.params.id);
  const deleteData = await CustomerSchema.findByIdAndDelete(req.params.id);
  if (deleteData) {
    resp.status(200).json({ message: "Customer deleted successfully" });
  } else {
    resp.status(500).json({
      message: "Error deleting Customer with id " + req.params.id,
    });
  }
};
//------------------------------------------------//

//------------------Customer Find All-------------//
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

    const data = await CustomerSchema.find(query).limit(pageSize).skip(skip).exec();
    resp.status(200).json(data);
  } catch (err) {
    resp.status(500).json({
      message: err.message || "Some error occurred while retrieving customers.",
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
