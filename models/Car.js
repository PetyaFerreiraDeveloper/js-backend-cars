const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: {type: String, required: true, minLength: 3 },
    description: {type: String, default: ""},
    imageUrl: {type: String, default: "noImage.jpg", required: true},
    price: {type: Number, required: true},
});

const Car = model('Car', carSchema);

module.exports = Car;