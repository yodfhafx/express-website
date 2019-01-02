var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodeMailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {title: 'welcome'});
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.post('/contact/send', function(req, res) {
    var transporter = nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'yodfha2014@gmail.com',
            pass: ''
        }
    });

    var mailOptions = {
        from: 'Yodfha Thungwiwatthanakul'
    }
});

app.listen(3000);
console.log('Server run on port 3000');
