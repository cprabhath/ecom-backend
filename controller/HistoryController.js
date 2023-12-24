////Purpose: History controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const HistorySchema = require("../model/HistorySchema");
//-----------------------------------------------------------------//

//------------------History Create----------------//
const create = (req, resp) => {
  const history = new HistorySchema({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });

  history
    .save()
    .then((data) => {
      resp.status(200).json({ message: "History created successfully" });
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while creating the History",
      });
    });
};
//------------------------------------------------//

//------------------History Find By Id-----------//
const findById = (req, resp) => {
  HistorySchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found History with id " + req.params.id,
        });
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Error retrieving History with id " + req.params.id,
      });
    });
};
//------------------------------------------------//

//------------------History Find All--------------//
const findAll = (req, resp) => {
  HistorySchema.find()
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      resp.status(500).json({
        message:
          err.message || "Some error occurred while retrieving History.",
      });
    });
};
//------------------------------------------------//

//--------------History Delete By Id--------------//
const deleteById = (req, resp) => {
  HistorySchema.findByIdAndRemove(req.params.id)
    .then((selectedObj) => {
      if (!selectedObj) {
        resp.status(404).json({
          message: "Not found History with id " + req.params.id,
        });
      } else {
        resp.send({ message: "History deleted successfully!" });
      }
    })
    .catch((err) => {
      resp.status(500).json({
        message: "Could not delete History with id " + req.params.id,
      });
    });
};
//------------------------------------------------//

//------------------Exporting Modules-------------//
module.exports = {
  create,
  findById,
  deleteById,
  findAll,
};
//------------------------------------------------//