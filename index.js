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
// - [] create register user service
// - [] create login user service
// - [] create logout user service
// - [] add authorization checks to data modification

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
// - [] auth controller with login, register and logout actions
// - [] protect the routes which anonimous users should not reach

// [x] add front-end code
// [x] add database connection
// [x] create Car model
// [x] upgrade car service to use Car model
// [x] add validation rules to Car model
// [x] create Accessory model
// [x] update Car model to have a relation to Accessory model
// [] add session middleware and auth libraries
// [] create User model
// [] add owner property to Car, Accessory models

const express = require("express");
const hbs = require("express-handlebars");

const initDb = require("./models");

const carsService = require("./services/carsService");
const accessoryService = require("./services/accessoryService");

const { home } = require("./controllers/homeController");
const { about } = require("./controllers/aboutController");
const create = require("./controllers/createController");
const { details } = require("./controllers/detailsController");
const deleteController = require("./controllers/deleteController");
const edit = require("./controllers/editController");
const accessory = require("./controllers/accessoryController");
const attach = require("./controllers/attachController");
const { registerGet, registerPost, loginGet, loginPost, logoutGet } =
  require("./controllers/auth");

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

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(carsService());
  app.use(accessoryService());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);

  app.route("/create").get(create.get).post(create.post);

  app
    .route("/delete/:id")
    .get(deleteController.get)
    .post(deleteController.post);

  app.route("/edit/:id").get(edit.get).post(edit.post);

  app.route("/accessory").get(accessory.get).post(accessory.post);

  app.route("/attach/:id").get(attach.get).post(attach.post);

  app.route("/register").get(registerGet).post(registerPost);
  app.route("/login").get(loginGet).post(loginPost);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started on port 3000"));
}
