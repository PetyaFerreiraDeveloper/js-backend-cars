// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [x] create layout
// [x] create data service
// - [x] read all
// - [x] read one by ID
// - [x] create
// - [] edit
// - [x] delete
// - [x] search
// - [] accessory read
// - [] accessory create
// - [] attach accessory
// [x] implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] search
// - [x] edit
// - [x] delete
// - [] create accessory
// - [] attach accessory to car
// - [] update details to include accessories
// [x] add front-end code
// [x] add database connection
// [x] create Car model
// [x] upgrade car service to use Car model
// [] add validation rules to Car model
// [] create Accessory model
// [] update Car model to have a relation to Accessory model

const express = require("express");
const hbs = require("express-handlebars");

const initDb = require("./models");

const carsService = require("./services/carsService");

const { home } = require("./controllers/homeController");
const { about } = require("./controllers/aboutController");
const create = require("./controllers/createController");
const { details } = require("./controllers/detailsController");
const deleteController = require("./controllers/deleteController");
const edit = require("./controllers/editController");

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

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);

  app.route("/create").get(create.get).post(create.post);

  app
    .route("/delete/:id")
    .get(deleteController.get)
    .post(deleteController.post);

  app.route("/edit/:id").get(edit.get).post(edit.post);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started on port 3000"));
}
