const { Schema, model, Types: {ObjectId} } = require('mongoose');

const carSchema = new Schema({
    name: {type: String, required: true, minLength: 3 },
    description: {type: String, default: "Description of the car"},
    imageUrl: {type: String, default: "noCarImage.jpg", required: true},
    price: {type: Number, required: true},
    accessories: {type: [ObjectId], default: [], ref: 'Accessory'}
});

const Car = model('Car', carSchema);

module.exports = Car;