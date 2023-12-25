// Purpose: Main file for the application

//----------------- Importing Packages --------------------//
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//--------------------------------------------------------//

//----------------- Importing Files ----------------------//
require("dotenv").config();
const app = express();
//---------------------------------------------------------//

//----------------- route variables ------------------------//
const UserRoute = require("./routes/UserRoute");
const OrderRoute = require("./routes/OrderRoute");
const ProductRoute = require("./routes/ProductRoute");
const WishlistRoute = require("./routes/WishlistRoute");
const HistoryRoute = require("./routes/HistoryRoute");
const CartRoute = require("./routes/CartRoute");
//---------------------------------------------------------//

//----------------- Environment Variables -----------------//
const PORT = process.env.SERVER_PORT || 3000;
const DB_URL = process.env.DB_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
//---------------------------------------------------------//

//------------------- Body Parser ------------------------//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//--------------------------------------------------------//

//------------------ Connect to MongoDB ------------------//
try {
  mongoose
    .connect(`${DB_URL}/${DATABASE_NAME}?retryWrites=true&w=majority`)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });
} catch (err) {
  console.log(err.message);
}
//-------------------------------------------------------//

//------------------ Server connection ------------------//
app.listen(() => {
  console.log(`Server started on port ${PORT}`);
});
//------------------------------------------------------//

//------------------------ Routes ----------------------//
try {
  app.use("/api/v1/orders", OrderRoute);
  app.use("/api/v1/products", ProductRoute);
  app.use("/api/v1/users", UserRoute);
  app.use("/api/v1/wishlist", WishlistRoute);
  app.use("/api/v1/history", HistoryRoute);
  app.use("/api/v1/cart", CartRoute);
} catch (error) {
  console.log(error.message);
}
//------------------------------------------------------//
