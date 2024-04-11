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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});