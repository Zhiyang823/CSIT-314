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
app.use( express.static( "public" ) );

app.get('',(req, res)=>{
  res.render('index')
})


//Customer view
app.get('/menuPage', (req, res) => {
  Menu.find({"type": 1}, function (err, menus) {
    res.render("menupage", {
      menuList: menus,
    });
  });
})
app.get('/menuMain', (req, res) => {
  Menu.find({"type": 2}, function (err, menus) {
    res.render("menumain", {
      menuList: menus,
    });
  });
})
app.get('/menuPasta', (req, res) => {
  Menu.find({"type": 3}, function (err, menus) {
    res.render("menupasta", {
      menuList: menus,
    });
  });
})
app.get('/menuSides', (req, res) => {
  Menu.find({"type": 4}, function (err, menus) {
    res.render("menusides", {
      menuList: menus,
    });
  });
})
app.get('/menuDrinks', (req, res) => {
  Menu.find({"type": 5}, function (err, menus) {
    res.render("menudrinks", {
      menuList: menus,
    });
  });
})
app.get('/menuDesserts', (req, res) => {
  Menu.find({"type": 6}, function (err, menus) {
    res.render("menudesserts", {
      menuList: menus,
    });
  });
})

app.get('/payment', (req, res) => {
  Order.find({}, function (err, orders) {
    res.render("customerpaymentpage", {
      orderList: orders,
    });
  });
})

app.get('/viewOrder', (req, res) => {
  Order.find({}, function (err, orders) {
    res.render("vieworder", {
      orderList: orders,
    });
  });
})

//admin view
app.get('/admin', (req, res) => {
  res.render('adminloginpage')
})

app.get('/adminView', (req, res) => {
  accounts.find({}, function (err, accounts) {
    res.render("adminview", {
      accountsList: accounts,
    });
  });
})

app.get('/addAccounts', (req, res) => {
  res.render('addaccounts')
})




//manager view
app.get('/manager', (req, res) => {
  res.render('managerloginpage')
})

app.get('/managerMenu', (req, res) => {
  res.render('managermenu')
})


app.get('/viewMenu', (req, res) => {
  Menu.find({}, function (err, menus) {
    res.render("viewmenu", {
      menuList: menus,
    });
  });
})

app.get('/addItem', (req, res) => {
  res.render('additem')
})




//staff view
app.get('/staff', (req, res) => {
  res.render('staffloginpage')
})


app.get('/staffMenu', (req, res) => {
  Order.find({}, function (err, orders) {
    res.render("staffmenupage", {
      orderList: orders,
    });
  });
})

app.get('/editOrder', (req, res) => {
  Order.find({}, function (err, orders) {
    res.render("editorderpage", {
      orderList: orders,
    });
  });
})




//Post Data
app.use(bodyParser.urlencoded({extended: true}));

app.get('/informationInput', (req, res) => {
  res.render('informationInput')
})

//new customer
app.post('/', function(req, res){

  let newCustomer = new Customers({
    email: req.body.email,
    mobile: req.body.mobile,
    name: req.body.name,
    tableNo: req.body.tableNo
  });

  newCustomer.save();
  res.redirect('/menuPage');

})

//add new order
app.post('/newOrder', function(req, res){

  let newOrder = new Order({
    itemId: req.body.itemId,
    itemPrice: req.body.itemId,
    tableNo: req.body.tableNo,
  });

  newOrder.save();
  res.redirect('/menuPage');

})

//add new items
app.post('/newItem', function(req, res){

  let newMenu = new Menu({
    foodName: req.body.foodName,
    quantity: req.body.quantity,
    price: req.body.price,
    type: req.body.type
  });

  newMenu.save();
  res.redirect('/viewMenu');

})


//new accounts
app.post('/newAccount', function(req, res){

  let newAccount = new accounts({
    userName: req.body.userName,
    password: req.body.password,
    role: req.body.role,
  });

  newAccount.save();
  res.redirect('/adminView');

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
