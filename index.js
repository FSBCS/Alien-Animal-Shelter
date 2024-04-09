const express = require('express'); 
const app = express();

const port = 3000; // We'll run our server on port 3000

app.set('view engine', 'ejs'); // Tell Express to use EJS
app.use(express.static('public')); 
const session = require('express-session');
const sessionSecret = require('./sessionSecret'); 

app.use(session({
    secret: sessionSecret(),
    resave: false,
    saveUninitialized: true
}));



app.get('/', (req, res) => {
    res.render('home'); // Look for a 'home.ejs' file
});

app.get('/animal', (req, res) => {
    res.render('animal'); 
});

app.get('/signup', (req, res) => {
    if (req.session.user) {
        res.redirect('/profile');
    } else {
        res.render('signup');
    }
});
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    const newUser = User.createNewUser(username, password, email, firstName, lastName); // Create a new user

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});