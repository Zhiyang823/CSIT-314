const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

const { Menu } = require("./models/menu");
const { accounts } = require("./models/accounts");
const { billings } = require("./models/billings");
const { Customers } = require("./models/customer");
const { Order } = require("./models/order");
const { restaurants } = require("./models/restaurants");
const { salesstatistics } = require("./models/salesstatistics");


require("dotenv/config");

// get env variables from dotenv
const api = process.env.API_URL;

// enable CORS
app.use(cors());
app.options("*", cors);

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const ordersRoutes = require("./routes/orders");
const customersRoutes = require("./routes/customers");
const menuRoutes = require("./routes/menu");
const accountsRoutes = require("./routes/accounts");
const billingsRoutes = require("./routes/billings");
const restaurantsRoutes = require("./routes/restaurants");
const salesstatisticsRoutes = require("./routes/salesstatistics");

//http://localhost:3000/api/orders
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/customers`, customersRoutes);
app.use(`${api}/menu`, menuRoutes);
app.use(`${api}/accounts`, accountsRoutes);
app.use(`${api}/billings`, billingsRoutes);
app.use(`${api}/restaurants`, restaurantsRoutes);
app.use(`${api}/salesstatistics`, salesstatisticsRoutes);


//Get Data
app.set("view engine", "ejs");
app.get('', (req, res) => {
  Menu.find({}, function (err, menus) {
    res.render("menupage", {
      menuList: menus,
    });
  });
});


//Post Data
app.use(bodyParser.urlencoded({extended: true}));

app.get('/informationInput', (req, res) => {
  res.render('informationInput')
})

app.post('/informationInput', function(req, res){

  let newAccount = new accounts({
    tablenoinput: req.body.tablenoinput
  })
  newTest.save();
  res.redirect('/')

})

// Connect to mongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "OrderingSystem",
  })
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

const port = 3000;
app.listen(process.env.PORT || port, () => {
  console.log(`${api}`);
  console.log(`Server is running on http://localhost:${port}`);
});
