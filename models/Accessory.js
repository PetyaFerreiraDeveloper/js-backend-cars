const { Schema, model } = require('mongoose');

const accessorySchema = new Schema({
    name: {type: String, required: true },
    description: {type: String, default: 'some description'},
    name: {type: String, default: 'noImage.jpg' },
    name: {type: String, min: 0 },
});

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;