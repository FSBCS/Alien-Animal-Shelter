const Animal = require('./animal');
const DB = require('./db');

const a = new Animal('Fluffy', 'A rare martian beaver', 'Space Beaver', '/images/fluffy.jpg');
const b = new Animal('Pinky', 'A unique axolotl', 'Space Axolotl', '/images/pinky.jpg');


DB.insertAnimal(b, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Added animal:');
    }
});


DB.insertAnimal(a, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Added animal:');
    }
});