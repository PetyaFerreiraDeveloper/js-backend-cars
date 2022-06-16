const Car = require("../models/Car");

function carViewModel(car) {
  return {
    id: car._id,
    name: car.name,
    description: car.description,
    imageUrl: car.imageUrl,
    price: car.price,
  };
}

async function getAll(query) {
  // const cars = await Car.find({}).lean(); // one way to solve the error from hbs
  // return cars;
  const options = {};

  if (query.search) {
    options.name = new RegExp(query.search, 'i');
  }
  if (query.from) {
    options.price = { $gte: Number(query.from)};
  } 
  if (query.to) {
    if (!options.price) {
      options.price = {}
    }
    options.price.$lte = Number(query.to);
  }

  { name: new RegExp(query.search, 'i')}

  const cars = await Car.find(options);
  return cars.map(carViewModel);
}

async function getById(id) {
  const car = await Car.findById(id);

  if (car) {
    return carViewModel(car);
  } else {
    return undefined;
  }
}

async function createCar(car) {
  const result = new Car(car);
  await result.save();
}

async function deleteById(id) {
  await Car.findByIdAndDelete(id);
  
}

async function editById(id, car) {
  const existing = await Car.findById(id);

  existing.name = car.name;
  existing.description = car.description;
  existing.imageUrl = car.imageUrl;
  existing.price = car.price;
  
  await existing.save();
}

// function nextId() {
//   return "xxxxxxxx-xxxx".replace(/x/g, () =>
//     ((Math.random() * 16) | 0).toString(16)
//   );
// }

module.exports = () => (req, res, next) => {
  req.storage = {
    getAll,
    getById,
    createCar,
    deleteById, 
    editById
  };
  next();
};
