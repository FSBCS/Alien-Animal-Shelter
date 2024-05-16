const express = require('express');
const sqlite3 = require('sqlite3').verbose();
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
app.use(express.json());

app.post('/update-username', (req, res) => {
    const user = req.body;
    db.updateUser(user, (err) => {
        if (err) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

app.use(session({
    secret: sessionSecret(),
    resave: false,
    saveUninitialized: true
}));

app.post('/', (req, res) => {
    const { username, password, email, firstName, lastName } = req.body;

    const newUser = User.createNewUser(username, email, firstName, lastName, password); // Create a new user
    console.log(username, password, email, firstName, lastName);
    db.insertUser(newUser, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/'); // Redirect to signup page on error
        } else {
            console.log('User added to database');
            console.log("Received signup request");
            console.log("Request body:", req.body);
            res.redirect('/login'); // Redirect to login page after successful signup
            console.log("Redirecting to login page");
        }
    });
});

app.get('/', (req, res) => {
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

app.post('/profile', requireLoggedIn, (req, res) => {
    res.redirect('/profile');
});

app.get('/home', (req, res) => {
    const user = req.session.user;
    res.render('home', {user}); // Look for a 'home.ejs' file
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
            return res.redirect('/');
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

app.put('/profile', (req, res) => {
    console.log("updating profile");
    console.log(req.body);

    const { firstName, lastName, email, password, username } = req.body;
    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        username: username
    };

    let user = new User(req.session.user);
    user.updatePassword(data.password);
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.username = data.username;

    db.updateUser(user);

    req.session.user = user;
    res.json({ success: true });
});

app.get("/api/animal", (req, res) => {
    db.getAllAnimals((err, animals) => {
        if (err) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.json(animals);
        }
    });
});

app.post("/api/favorites", (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ success: false, message: "User not authenticated" });
    }
    const { animalId } = req.body;
    const user = User.fromJSON(req.session.user);
    if (user.favorites.includes(animalId)) {
        user.removeFavorite(animalId);
    } else {
        user.addFavorite(animalId);
    }
    db.updateUser(user);

    req.session.user = user;

    res.json({ success: true });
});
    



function requireLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next(); 
    } else {
        res.redirect('/login'); 
    }
};

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => { 
    console.log(`Server listening on port ${port}`);
});
