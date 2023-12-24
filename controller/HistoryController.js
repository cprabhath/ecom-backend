////Purpose: History controller to handle all the request and response

//-----------------------Importing Packages-------------------------//
const HistorySchema = require("../model/HistorySchema");
const ResponseService = require("../services/ResponseService");
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
      if (data) {
        return ResponseService(resp, 200, "History created successfully");
      } else {
        return ResponseService(resp, 500, err.message);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//------------------History Find By Id-----------//
const findById = (req, resp) => {
  HistorySchema.findById({ _id: req.params.id })
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "History not found with id " + req.params.id
        );
      } else {
        resp.send(selectedObj);
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
      return ResponseService(resp, 500, err.message);
    });
};
//------------------------------------------------//

//--------------History Delete By Id--------------//
const deleteById = (req, resp) => {
  HistorySchema.findByIdAndRemove(req.params.id)
    .then((selectedObj) => {
      if (!selectedObj) {
        return ResponseService(
          resp,
          404,
          "History not found with id " + req.params.id
        );
      } else {
        return ResponseService(resp, 200, "History deleted successfully");
      }
    })
    .catch((err) => {
      return ResponseService(resp, 500, err.message);
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
