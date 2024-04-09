const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const db = require('./util/db'); // Assuming db.js contains database functions
const User = require('./util/user'); // Assuming User.js contains user-related functions
require('dotenv').config();
const session = require('express-session');
const sessionSecret = require('./util/sessionSecret'); // Import the session secret generator

const app = express();
const port = 3000;

const sqlite = new sqlite3.Database('./data.sqlite');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
    secret: sessionSecret(),
    resave: false,
    saveUninitialized: true
}));

app.post('/signup', (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;

    const newUser = User.createNewUser(username, email, firstName, lastName, password); // Create a new user

    db.insertUser(newUser, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/signup'); // Redirect to signup page on error
        } else {
            console.log('User added to database');
            res.redirect('/login'); // Redirect to login page after successful signup
        }
    });
});

app.get('/signup', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.render('signup');
    }
});

   
app.get('/profile', requireLoggedIn, (req, res) => {
    res.render('profile');
    
});
app.get('/', (req, res) => {
    res.render('home'); // Look for a 'home.ejs' file
});

app.get('/animal', (req, res) => {
    res.render('animal'); 
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.getUserByUsername(username, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user.verifyPassword(password)) {
                req.session.user = user;
                res.redirect('/profile');
            } else {
                res.redirect('/signup');
            }
        }
    });

}); 

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.render('login');
    }
});
function requireLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/signup');
    }

}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


