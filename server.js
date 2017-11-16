const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (er) => {
        if(er) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
/*app.use((req, res, next) =>{
    res.render('maintenance.hbs');
});*/
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('welcomeMessage', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    //res.send('<h1>Hello, Express!</h1>');
    res.render('home.hbs', {
        message: 'Welcome to some website!',
        pageTitle: 'Home'
    });
    
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        Error: 'Unable to fullfil the request'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects',
        greetings: "My Projects' Portfolio"
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});