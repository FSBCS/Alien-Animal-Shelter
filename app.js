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
console.log(username, password, email, firstName, lastName);
    db.insertUser(newUser, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/signup'); // Redirect to signup page on error
        } else {
            console.log('User added to database');
            console.log("Received signup request");
            console.log("Request body:", req.body);
            res.redirect('/login'); // Redirect to login page after successful signup
            console.log("Redirecting to login page");
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
    const { username, email, firstName, lastName } = req.session.user;
    res.render('profile', { username, email, firstName, lastName });
});

app.post ('/profile', requireLoggedIn, (req, res) => {
    res.redirect('/profile');
});




app.get('/', (req, res) => {
    res.render('home'); // Look for a 'home.ejs' file
});

app.get('/animal', (req, res) => {
    res.render('animal'); 
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
     console.log(username, password);
        // Check if username is provided
        if (!username) {
            return res.redirect('/login');
        }
        
        // Call the getUserByUsername function
        db.getUserByUsername(username, (err, user) => {
            if (err) {
                console.log(err);
                return res.redirect('/signup');
            } else {
                if (user && user.verifyPassword(password)) {
                    req.session.user = user;
                    console.log("Received login request");
                    console.log("Request session User:", req.session.user);
                    return res.redirect('/profile');
                } else {
                    return res.redirect('/login');
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


