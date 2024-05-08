const Animal = require('./animal');
const DB = require('./db');
const a = new Animal('Fluffy', 'A rare martian beaver', 'Space Beaver', '/images/fluffy.jpg');
DB.insertAnimal(a, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Added animal:');
    }
});
