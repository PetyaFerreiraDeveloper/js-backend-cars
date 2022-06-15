const mongoose = require('mongoose');

const Car = require('./Car');

const connectionString = 'mongodb://localhost:27017/carbicle';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });         
        console.log('Database connected');

        await Car.create({
            "name": "Subaru Legacy 2010",
            "description": "We are a small family run business importing low volume hand picked vehicles by our trusted contacts in Japan.",
            "imageUrl": "subaru-legacy.webp",
            "price": 3300
        });

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })
    } catch(err) {
        console.error('Error connection to database');
        process.exit(1);
    }
}

module.exports = init;