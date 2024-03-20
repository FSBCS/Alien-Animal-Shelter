const express = require('express'); 
const app = express();
const port = 3000; // We'll run our server on port 3000

app.set('view engine', 'ejs'); // Tell Express to use EJS

app.get('/', (req, res) => {
    res.render('home'); // Look for a 'home.ejs' file
});

app.get('/', (req, res) => {
    res.render('animal'); 
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});