// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [x] create layout
// [x] create data service
// - [x] read all
// - [x] read one by ID
// - [x] create
// - [x] edit
// - [x] delete
// - [x] search
// - [x] accessory read
// - [x] accessory create
// - [x] attach accessory
// - [x] create register user service
// - [x] create login user service
// - [x] create logout user service
// - [x] add authorization checks to data modification

// [x] implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] search
// - [x] edit
// - [x] delete
// - [x] create accessory
// - [x] attach accessory to car
// - [x] update details to include accessories
// - [x] auth controller with login, register and logout actions
// - [x] protect the routes which anonimous users should not reach
// - [x] only show edit buttons for record owner

// [x] add front-end code
// [x] add database connection
// [x] create Car model
// [x] upgrade car service to use Car model
// [x] add validation rules to Car model
// [x] create Accessory model
// [x] update Car model to have a relation to Accessory model
// [x] add session middleware and auth libraries
// [x] create User model
// [x] add owner property to Car, Accessory models

const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");

const initDb = require("./models");

const carsService = require("./services/carsService");
const accessoryService = require("./services/accessoryService");
const authService = require("./services/authService");

const { home } = require("./controllers/homeController");
const { about } = require("./controllers/aboutController");
const create = require("./controllers/createController");
const { details } = require("./controllers/detailsController");
const deleteController = require("./controllers/deleteController");
const edit = require("./controllers/editController");
const accessory = require("./controllers/accessoryController");
const attach = require("./controllers/attachController");
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logout,
} = require("./controllers/authController");
const { isLoggedIn } = require("./services/util");
const { notFound } = require("./controllers/notFound");


start();

async function start() {
  await initDb();

  const app = express();

  app.engine(
    "hbs",
    hbs.create({
      extname: "hbs",
    }).engine
  );
  app.set("view engine", "hbs");

  app.use(
    session({
      secret: "my super duper secret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: "auto" },
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(carsService());
  app.use(accessoryService());
  app.use(authService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);

  app.route("/create").get(isLoggedIn(), create.get).post(isLoggedIn(), create.post);

  app
    .route("/delete/:id")
    .get(isLoggedIn(), deleteController.get)
    .post(isLoggedIn(), deleteController.post);

  app.route("/edit/:id").get(isLoggedIn(), edit.get).post(isLoggedIn(), edit.post);

  app.route("/accessory").get(isLoggedIn(), accessory.get).post(isLoggedIn(), accessory.post);

  app.route("/attach/:id").get(isLoggedIn(), attach.get).post(isLoggedIn(), attach.post);

  app.route("/register").get(registerGet).post(registerPost);
  app.route("/login").get(loginGet).post(loginPost);
  app.get("/logout", logout);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started on port 3000"));
}
